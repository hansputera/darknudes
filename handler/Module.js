const { default: Collection } = require("@discordjs/collection");
const TelegramError = require("./TelegramError");
const {
    readdir
} = require("fs");

module.exports = async bot => {
  bot.commands = new Collection();  
  bot.aliases = new Collection();
  bot.helps = new Collection();

  readdir("./commands/", (error, categories) => 
  {
    if (error) throw new TelegramError("Broken: " + error.stack);
    console.info(`Found ${categories.length} categories.`);
    categories.forEach(category => {
        let moduleConf = require(`../commands/${category}/module.json`);
        moduleConf.cmds = [];
        bot.helps.set(category, moduleConf);
        readdir(`./commands/${category}/`, (err, files) => {
            if (err) throw new TelegramError("Broken: " + err.stack);
            console.info(`Found ${files.length - 1} commands from ${category}.`);
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                const prop = require(`../commands/${category}/${file}`);
                bot.commands.set(prop.help.name, prop);
                prop.conf.aliases.forEach(alias => {
                    bot.aliases.set(alias, prop.help.name);
                });
                bot.helps.get(category).cmds.push(prop.help.name);
            });
        });
    });
  });
};