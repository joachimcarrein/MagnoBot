require("dotenv").config()

const Discord = require("discord.js")

const client = new Discord.Client({
    intents: [
        // "GUILD_MEMBERS", // a member enters the server => guildMemberAdd
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

let bot = {
    client,
    prefix: "!"
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.buttons = new Discord.Collection()
client.aliases = new Discord.Collection()
client.functions = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadEvents(bot, false)

client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadCommands(bot, false)

client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)
client.loadButtons(bot, false)

client.loadFunctions = (client, reload) => require(`./handlers/functions`)(client, reload);
client.loadFunctions(bot, false);

module.exports = bot

client.login(process.env.DISCORD_TOKEN)