const TelegramError = require("../handler/TelegramError");

module.exports = async (bot, message) => {
    if (message.chat.type === "group") {
        bot.sendMessage(message.chat.id, "Bot ini sedang dalam posisi maintenance.");
    } else if (message.chat.type === "private") {
        const msg = message.text.toLowerCase();
        if (msg === bot.getMe().username + "Bot") {
            return bot.sendMessage(message.chat.id, `👋 | Hello, iam ${bot.getMe().username}.Nice to meet you!`);
        }

        if (msg.startsWith(bot.config.prefix)) {
        try {
            require("../handler/CommandHandler")(bot, message);
        } catch (e) {
            throw new TelegramError(e.message);
        }
    }
    } else {
        bot.sendMessage("Maintenance.");
    }
}