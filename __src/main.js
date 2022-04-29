const Discord = require("discord.js");
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        // "GUILD_MEMBERS", // a member enters the server => guildMemberAdd
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

const config = require("./config.js");
const { prefix } = require("./config.js");
const fs = require("fs");

let bot = {
    client, 
    config, 
    prefix
};

/**
 * These add commands, aliases, events, and functions to the client object
 * Discord Collections work like a Map/Dictionary Object
 * To get a specific function from the collection, use 
 * client.xxxxxxx.get("name");
 */
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.functions = new Discord.Collection();
client.categories = fs.readdirSync("./src/commands/");

/**
 * These functions are used to grab the modules in each corresponding folder
 * whenever the loadxxx() functions are called, the cache will be cleared of the previous data 
 * and the new data will be loaded into the collections so you can update code without restarting the
 * entire bot
 */
client.loadCmds = (client, reload) => require(`./handlers/command`)(client, reload);
client.loadFunctions = (client, reload) => require(`./handlers/function`)(client, reload);
client.loadEvents = (client, reload) => require("./handlers/event.js")(client, reload, bot);
client.loadCmds(client, false);
client.loadFunctions(client, false);
client.loadEvents(client, false);

module.exports = bot;
client.login(process.env.DISCORD_TOKEN);