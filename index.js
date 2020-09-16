const Client = require("./handler/Client");
const bot = new Client({ polling: true });

bot.init();