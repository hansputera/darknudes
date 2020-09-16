module.exports = async (bot, message) => {
    const args = message.text.slice(bot.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    cmd.run(bot, message, args);
    if (!cmd) return;
};