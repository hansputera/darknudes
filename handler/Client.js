const TelegramBot = require("node-telegram-bot-api");
const cfg = require("../config.json");

module.exports = class DarkBot extends TelegramBot {
    constructor(opt) {
        super(cfg.token, opt);
        this.config = cfg;
    }

     async init() {
        process.stdout.write("Logged");
    }
}