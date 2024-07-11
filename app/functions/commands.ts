import { Markup } from "telegraf";
import bot from "@app/functions/telegraf";
import writeUser from "@database/methods/writeUser";
import * as TEXTS from "@texts";
import { TImoova } from "@database/models/Imoova";

const start = async (): Promise<void> => {
	bot.start((ctx) => {
		writeUser(ctx.update.message.from);

		const keyboard = Markup.keyboard([
			[TEXTS.KEYBOARD_BUTTONS.RUN],
			[TEXTS.KEYBOARD_BUTTONS.STOP],
			[TEXTS.KEYBOARD_BUTTONS.PING],
		]).resize();

		ctx.replyWithMarkdown(TEXTS.START, keyboard);
	});
};

const sendImoova = async (userId: number, imoova: TImoova): Promise<void> => {
	const dateFromText = new Date(imoova.available_from_date).toLocaleDateString();
	const dateToText = new Date(imoova.available_to_date).toLocaleDateString();
	const dateLastText = new Date(imoova.latest_departure_date).toLocaleDateString();
	const title = `*${imoova.departureCity.name} ${imoova.departureCity.state} - ${imoova.deliveryCity.name} ${imoova.deliveryCity.state}*\n`;
	const duration = `${dateFromText} - ${dateToText}\n`;
	const durationLast = `До: ${dateLastText}\n`;
	const days = `${imoova.hire_units_allowed} дней, в наличии: ${imoova.count}\n\n`;
	const vehicleTitle = `*Информация о транспорте*\n`;
	const vehicleNameType = `${imoova.vehicle.name}\n`;
	const vehicleTransmission = `Трансмиссия: ${imoova.vehicle.transmission}\n\n`;
	const link = `[Ссылка на поездку](https://imoova.com/relocations/${imoova.id})`;

	const message = title + duration + durationLast + days + vehicleTitle + vehicleNameType + vehicleTransmission + link;

	try {
		await bot.telegram.sendPhoto(userId, imoova.vehicle.heroImage, {
			caption: message,
			parse_mode: "Markdown",
		});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		if (typeof err.response.description === "string" && err.response.description.includes("Bad Request: wrong file")) {
			bot.telegram.sendMessage(userId, message, {
				parse_mode: "Markdown",
			});
		} else {
			sendError(userId);
		}
	}
};

const sendError = async (userId: number): Promise<void> => {
	bot.telegram.sendMessage(userId, "Произошла ошибка, пишите Антону");
};

export {
	sendImoova,
	sendError,
	start
};
export default start;
