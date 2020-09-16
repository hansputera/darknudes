const TelegramBot = require("node-telegram-bot-api");
const cfg = require("../config.json");

module.exports = class DarkBot extends TelegramBot {
    constructor(opt) {
        super(cfg.token, opt);
        this.config = cfg;
    }

     async init() {
         require("./Events")(this);
         require("./Module")(this);
        console.info("Logged for Telegram Bot");

        const listCommand = this.commands.array().map(obj => obj.help);
        this.setMyCommands(listCommand).then(() => {
            console.info("Commands Resolved!");
        }).catch(e => {
            console.error(e.stack);
        });
    }
}