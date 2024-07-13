import { Markup } from "telegraf";
import bot from "@app/functions/telegraf";
import writeUser from "@database/methods/writeUser";
import * as TEXTS from "@texts";
import { TImoova } from "@database/models/Imoova";

const ADMIN_ID = 631092586;

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

const sendImoova = async (userId: number, imoova: TImoova, retries = 0): Promise<void> => {
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
		if (retries > 3) {
			bot.telegram.sendMessage(userId, "Ошибка при отправке сообщения с поездкой, нужно проверить вручную");
		} else {
			try {
				if (typeof err.response.description === "string" && err.response.description.includes("Bad Request: wrong file")) {
					await bot.telegram.sendMessage(userId, message, {
						parse_mode: "Markdown",
					});
				}
			} catch (err) {
				await sendImoova(userId, imoova, retries + 1);
			}
		}
	}
};

const sendError = async (text: string, retries = 0): Promise<void> => {
	try {
		await bot.telegram.sendMessage(ADMIN_ID, text);
	} catch (err) {
		if (retries > 3) {
			await bot.telegram.sendMessage(ADMIN_ID, "Ошибка при отправке сообщения об ошибке");
		} else {
			await sendError(text, retries + 1);
		}
	}
};

export {
	sendImoova,
	sendError,
	start
};
export default start;
