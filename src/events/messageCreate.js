const Discord = require("discord.js")

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const { client, prefix, admins } = bot

        if (!message.guild) return

        if (message.author.bot) return //ignore bots        

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)

        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr)
        if (!command) return // undefined command

        let member = message.member

        if (command.adminOnly && !admins.includes(member.id)) {
            return message.reply("This command is only available to the bot admins.")
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
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