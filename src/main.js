require("dotenv").config()

const Discord = require("discord.js")
const fs = require("fs")

const client = new Discord.Client({
    intents: [
        // "GUILD_MEMBERS", // a member enters the server => guildMemberAdd
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

let bot = {
    client,
    prefix: "!",
    slashguilds: ["968886418883637278"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.buttons = new Discord.Collection()
client.aliases = new Discord.Collection()
client.functions = new Discord.Collection()
client.slashcommands = new Discord.Collection()
client.categories = fs.readdirSync("./src/commands/");

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadEvents(bot, false)

client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadCommands(bot, false)

client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)
client.loadButtons(bot, false)

client.loadFunctions = (bot, reload) => require(`./handlers/functions`)(bot, reload);
client.loadFunctions(bot, false);

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.announceSlashCommands = (bot, reload) => require("./handlers/announceslash")(bot)

module.exports = bot

client.login(process.env.DISCORD_TOKEN)