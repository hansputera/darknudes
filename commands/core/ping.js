module.exports = {
    help: {
        command: "ping",
        name: "ping",
        description: "Ping Pong!"
    },
    conf: {
        aliases: []
    },
    run: async (bot, message, args) => {
        bot.sendMessage(message.chat.id, "Pong!");
    }
}