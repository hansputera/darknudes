const {
    readdirSync
} = require("fs");

module.exports = async bot => {
    const events = readdirSync("./events/");
    console.info(`Loaded ${events.length} events.`);
    for (const event of events) {
        const file = require(`../events/${event}`);
        bot.on(event.split(".")[0], (...args) => file(bot, ...args));
    }
};