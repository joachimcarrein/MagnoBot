require("dotenv").config()

const Discord = require("discord.js")
const keepAlive = require('./server')
const Levels = require('discord-xp')
const fs = require("fs")
const mongoose = require("./_database/mongoose")

const client = new Discord.Client({
    intents: [
        "GUILD_MEMBERS",
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

let bot = {
    client,
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

const connString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@magnobot.ic6jh.mongodb.net/MagnoBotDB?retryWrites=true&w=majority`
mongoose.init(connString)
Levels.setURL(connString)

keepAlive()