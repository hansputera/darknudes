const TelegramError = require("../handler/TelegramError");

module.exports = async (bot, message) => {
    if (message.chat.type === "group") {
        bot.sendMessage(message.chat.id, "Bot ini sedang dalam posisi maintenance.");
    } else if (message.chat.type === "private") {
        const msg = message.text.toLowerCase();
        if (msg === "/start") {
            bot.sendMessage(message.chat.id, `👋 | Hello, iam ${(await bot.getMe()).username}. My prefix is d!, so you can use d!ping for run command.`);
        }
        if (msg === `@${(await bot.getMe()).first_name.toLowerCase().split(" Bot")[0]}Bot`) {
            return bot.sendMessage(message.chat.id, `👋 | Hello, iam ${(await bot.getMe()).username}.Nice to meet you!`);
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