/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import User from "@database/models/User";
import fs from "fs";
import { sendError, sendImoova } from "@app/functions/commands";
import axios from "axios";
import { definitions } from "@configs/imoovaRequestDefinitions";
import { Imoova, TImoova } from "@database/models/Imoova";

type PaginatorInfo = {
	total: number;
	lastPage: number;
	currentPage: number;
	count: number;
	hasMorePages: boolean;
	perPage: number;
}

const CHECK_INTERVAL = 60000;

let intervalId: NodeJS.Timeout;

export let lastSuccessfulCheck: Date | null = null;

function requestImoovas(first = 100, page = 1) {
	return axios.post(
		"https://www.imoova.com/en/relocations?region=EU",
		[
			{
				kind: "Document",
				definitions: definitions,
			},
			{
				"first": first,
				"page": page,
				"status": [
					"READY",
				],
				"region": "EU",
				"departure_city_id": "$undefined",
				"delivery_city_id": "$undefined",
				"supplier_id": "$undefined",
				"defaultOrder": true
			}
		],
		{
			headers: {
				"accept": "text/x-component",
				"accept-language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7,de;q=0.6,es;q=0.5",
				"baggage": "sentry-environment=vercel-production,sentry-release=cc5e72f170a4130799c2b0efeac43b619658d0f0,sentry-public_key=3472c2fdec876e08d907f109f25998c3,sentry-trace_id=79471b0b07394e12b96754eb7edca03c,sentry-sample_rate=0.1,sentry-sampled=false",
				"content-type": "text/plain;charset=UTF-8",
				"next-action": "cfc0e6e34f0d72e4ff22472c69dcd1039620dd97",
				"next-router-state-tree": "%5B%22%22%2C%7B%22children%22%3A%5B%5B%22lng%22%2C%22en%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22relocations%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22region%5C%22%3A%5C%22EU%5C%22%7D%22%2C%7B%7D%2C%22%2Fen%2Frelocations%3Fregion%3DEU%22%2C%22refresh%22%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D%7D%5D",
				"priority": "u=1, i",
				"sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"sentry-trace": "79471b0b07394e12b96754eb7edca03c-b5a6bd37103a2ce8-0",
				"x-kl-saas-ajax-request": "Ajax_Request",
			},
			withCredentials: true,
		}
	);
}

function parseImoovasResponse(response: Awaited<ReturnType<typeof requestImoovas>>): { data: TImoova[], paginatorInfo: PaginatorInfo } {
	fs.writeFileSync("data.json", response.data);

	const rawData = fs.readFileSync("data.json").toString();
	const splitIndex = rawData.indexOf("1:");
	const resultObject = JSON.parse(rawData.slice(splitIndex + 2));
	const { data, paginatorInfo } = resultObject.relocations;

	return { data, paginatorInfo };
}

async function watchImoovas(): Promise<void> {
	intervalId = setInterval(async () => {
		try {
			const response = await requestImoovas();
			const { data } = parseImoovasResponse(response);

			const onlyLongTrips = data.filter((trip) => trip.hire_units_allowed >= 7);
			const imoovasInDb = await Imoova.find();
			const newImoovas = onlyLongTrips.filter((trip) => !imoovasInDb.some((dbTrip) => dbTrip.id === trip.id));
			const outdatedImoovas = imoovasInDb.filter((trip) => !onlyLongTrips.some((newTrip) => newTrip.id === trip.id));

			const outdatedImoovasIds = outdatedImoovas.map((trip) => trip.id);
			await Imoova.deleteMany({ id: { $in: outdatedImoovasIds } });

			await Imoova.insertMany(newImoovas);

			const subscribedUsers = await User.find({ isSubscribed: true });

			subscribedUsers.forEach((user) => {
				newImoovas.forEach((imoova) => {
					sendImoova(user.id, imoova);
				});
			});

			lastSuccessfulCheck = new Date();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err);

			sendError(err?.message || "Ошибка при запросе данных с Imoova");
		}
	}, CHECK_INTERVAL);
}

function stopWatchImoovas(): void {
	clearInterval(intervalId);
}

export { watchImoovas, stopWatchImoovas };
export default watchImoovas;
