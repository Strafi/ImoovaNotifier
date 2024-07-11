/**
 * Init
 * =====================
 * Configure telegram token and username
 *
 */
import * as fs from "fs";
import * as shell from "shelljs";
import { argv } from "yargs";

declare const __dirname: string;
const path = `${__dirname}/../app/configs/config.js`;

if (fs.existsSync(path)) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	shell.sed("-i", "BOT_USERNAME", `${argv._[0]}`, path);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	shell.sed("-i", "BOT_TOKEN", `${argv._[1]}`, path);
}
