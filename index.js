const Client = require("./handler/Client");
const bot = new Client({ polling: true });

bot.init();

bot.on("message", async (msg) => {
    bot.getMe().us
})