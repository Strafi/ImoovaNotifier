import { Telegraf } from "telegraf";
import configs from "@configs/config";

const bot = new Telegraf(configs.telegram.token);

export { bot };
export default bot;
