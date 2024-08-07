/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import User from "@database/models/User";
import { sendError, sendImoova } from "@app/functions/commands";
import axios from "axios";
import { imoovaRequestGQLquery } from "@configs/imoovaRequestGQLquery";
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
		"https://api2.imoova.com/graphql",
		{
			operationName: "RelocationList",
			query: imoovaRequestGQLquery,
			variables: {
				defaultOrder: true,
				first,
				page,
				region: "EU",
				status: ["READY"],
			},
		},
		{
			headers: {
				"accept": "application/json",
				"accept-language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7,de;q=0.6,es;q=0.5",
				"content-type": "application/json",
				"priority": "u=1, i",
				"sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site",
			},
			withCredentials: true,
		}
	);
}

function parseImoovasResponse(response: Awaited<ReturnType<typeof requestImoovas>>): { data: TImoova[], paginatorInfo: PaginatorInfo } {
	return response.data.data.relocations;
}

async function watchImoovas(): Promise<void> {
	intervalId = setInterval(async () => {
		try {
			const response = await requestImoovas();
			const { data } = parseImoovasResponse(response);

			const onlyLongTrips = data.filter((trip) => trip.hire_units_allowed >= 5);
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
			const isMiscError = err?.message?.includes("EAI_AGAIN");

			if (!isMiscError) {
				console.error(err);
				sendError(err?.message || "Ошибка при запросе данных с Imoova");
			}
		}
	}, CHECK_INTERVAL);
}

function stopWatchImoovas(): void {
	clearInterval(intervalId);
}

export { watchImoovas, stopWatchImoovas };
export default watchImoovas;
