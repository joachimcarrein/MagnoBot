require("dotenv").config()
//require("./modules/tools.js")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
//const Logger = require("./modules/Logger.js")

const Discord = require("discord.js")

const prefix = "!"

//console.log(Date.now())

const client = new Discord.Client({
    intents: [
        //"GUILD_MEMBERS", // a member enters the server => guildMemberAdd
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", async msg => {
    //if our message doesnt start with our defined prefix, dont go any further into function
    if (!msg.content.startsWith(prefix)) {
        //console.log('no prefix')
        return
    }

    const args = msg.content.slice(prefix.length).trim().split(' ')

    //splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase()

    //log the command
    console.log('command: ', command)
    //log any arguments passed with a command
    console.log(args)

    if (command === 'ego') {
        msg.react("😀")
        msg.reply('wow, what a great post')
    }

    if (command === "hi") {
        if (args.length === 0) {
        msg.reply(`Hi, <@${msg.author.id}>!`)
        } else {
            msg.reply(`<@${msg.author.id}> says hi: ${args.join(" ")}`)
        }
    }

    if (command === "clear") {
        //default deletes message itself plus previous
        let num = 2;

        //if argument is provided, we need to convert it from string to number
        if (args[0]) {
            //add 1 to delete clear command itself
            num = parseInt(args[0]) + 1;
        }
        //bulk delete the messages
        msg.channel.bulkDelete(num);
        //notify channel of deleted messages
        let newmsg = await msg.channel.send(`deleted ${args[0]} posts for you.\nMessage will self destruct in 5 seconds.`);
        await delay(5000)
        newmsg.delete()
    }
})

client.login(process.env.DISCORD_TOKEN)