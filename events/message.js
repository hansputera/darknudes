module.exports = async (bot, message) => {
    if (message.chat.type === "group") {
        bot.sendMessage(message.chat.id, "Bot ini sedang dalam posisi maintenance.");
    } else if (message.chat.type === "private") {
        const msg = message.text.toLowerCase();
        if (msg ===)
    } else {
        bot.sendMessage("Maintenance.");
    }
};