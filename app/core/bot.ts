/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import dotenv from "dotenv";
import bot from "@app/functions/telegraf";
import * as command from "@app/functions/commands";
import * as hears from "@app/functions/hears";
import launch from "@app/functions/launcher";
import { openDBConnection, closeDBConnection } from "./databaseConnection";
import { watchImoovas, stopWatchImoovas } from "./watchImoovas";

dotenv.config();

const startBot = async () => {
	await command.start();

	await hears.run();
	await hears.stop();
	await hears.ping();

	await launch();
};

startBot();

/**
 * Init DB connection
 */
openDBConnection()
	.then(isConnected => {
		if (isConnected) {
			watchImoovas();
		}
	});

process.once("SIGINT", () => {
	console.log("\n");
	console.info("Gracefully shutting down");

	bot.stop("SIGINT");
	stopWatchImoovas();
	closeDBConnection();
});
