const Discord = require("discord.js")

const {getPermissionLevel, getPermissionName} = require("../handlers/permissions")

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const { client, prefix } = bot

        if (!message.guild) return

        if (message.author.bot) return //ignore bots        

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)

        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr) || client.commands.get(client.aliases.get(cmdstr))
        if (!command) return // undefined command

        let member = message.member

        if (command.permissions && getPermissionLevel(message.member) > command.permissions) {
            return message.reply("You do not have permission to run this command.")
        }

        try {
            await command.run({ ...bot, message, args })
        } catch (error) {
            let errMsg = error.toString()

            if (errMsg.startsWith("?")) {
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            }
            else
                console.error(errMsg)
        }
    }
}