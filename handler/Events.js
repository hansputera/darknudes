const {
    readdirSync
} = require("fs");

module.exports = async bot => {
    const events = readdirSync("./events/");
    process.stdout.write(`Loaded ${events.length} events.`);
    for (const event of events) {
        const file = require(`../commands/${event}`);
        bot.on(event.split(".")[0], (...args) => file(bot, ...args));
    }
};