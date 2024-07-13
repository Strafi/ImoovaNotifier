import bot from "@app/functions/telegraf";
import { subscribeUser } from "@database/methods/subscribeUser";
import { unsubscribeUser } from "@database/methods/unsubscribeUser";
import * as TEXTS from "@texts";
import { lastSuccessfulCheck } from "@app/core/watchImoovas";

const run = async (): Promise<void> => {
	bot.hears(TEXTS.KEYBOARD_BUTTONS.RUN, (ctx) => {
		subscribeUser(ctx.update.message.from.id);
		ctx.reply("Запущено");
	});
};

const ping = async (): Promise<void> => {
	bot.hears(TEXTS.KEYBOARD_BUTTONS.PING, (ctx) => {
		ctx.reply(`Понг ${lastSuccessfulCheck?.toString() || ""}`);
	});
};

const stop = async (): Promise<void> => {
	bot.hears(TEXTS.KEYBOARD_BUTTONS.STOP, (ctx) => {
		unsubscribeUser(ctx.update.message.from.id);
		ctx.reply("Остановлено");
	});
};

export { run, stop, ping };
export default run;
