const fs = require("fs")
const Discord = require("discord.js")
const EventEmitter = require('node:events');
class Bot {
    constructor() {

        //super()

        this.client = null
        this.killBot
        this.start
        this.restart
        this.eventEmitter = new EventEmitter()
    }

    killBot = function() {
        process.exit(-1)
    }

    start = function() {
        this.client = new Discord.Client({
            intents: [
                "GUILD_MEMBERS",
                "GUILDS",
                "GUILD_MESSAGES",
                "GUILD_MESSAGE_REACTIONS"
            ],
            partials: [
                "REACTION",
                // "MESSAGE",
                // "CHANNEL",
                // "GUILD_MEMBER",
                // "USER"
            ]
        })

        this.client.commands = new Discord.Collection()
        this.client.events = new Discord.Collection()
        this.client.buttons = new Discord.Collection()
        this.client.aliases = new Discord.Collection()
        this.client.functions = new Discord.Collection()
        this.client.slashcommands = new Discord.Collection()
        this.client.snipes = new Discord.Collection()
        this.client.categories = fs.readdirSync("./src/commands/");

        this.client.loadEvents = (bot, reload) => require("../handlers/events")(bot, reload)
        this.client.loadEvents(this, false)

        this.client.loadCommands = (bot, reload) => require("../handlers/commands")(bot, reload)
        this.client.loadCommands(this, false)

        this.client.loadButtons = (bot, reload) => require("../handlers/buttons")(bot, reload)
        this.client.loadButtons(this, false)

        this.client.loadFunctions = (bot, reload) => require(`../handlers/functions`)(bot, reload);
        this.client.loadFunctions(this, false);

        this.client.loadSlashCommands = (bot, reload) => require("../handlers/slashcommands")(bot, reload)
        this.client.loadSlashCommands(this, false)

        this.client.announceSlashCommands = (bot, reload) => require("../handlers/announceslash")(bot)

        this.client.login(process.env.DISCORD_TOKEN)
    }

    restart = function() {
        this.client.destroy()
        this.client = null

        // delete require cache
        Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })

        this.eventEmitter.emit("botrestart")
    }
}

module.exports = Bot