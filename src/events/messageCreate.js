const Discord = require("discord.js")
const Blacklist = require('../_database/models/blacklistSchema')
const Levels = require('discord-xp')
const { addLog } = require('../functions/logs')

const { getPermissionLevel, getPermissionName } = require("../handlers/permissions")

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const { client } = bot
        let guildSettings = await client.functions.get("functions").getGuildSettings(message.guild.id)

        if (!message.guild) return

        if (message.author.bot) return //ignore bots 

        const randomXP = Math.floor(Math.random() * 29) + 1 // 1-30
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP)
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id)
            message.channel.send(`${message.member}, congratulations! You have leveled up to **level ${user.level}**. :tada:`)
        }

        if (!message.content.startsWith(guildSettings.prefix)) return

        const args = message.content.slice(guildSettings.prefix.length).trim().split(/ +/g)

        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr) || client.commands.get(client.aliases.get(cmdstr))
        if (!command) return // undefined command        

        let member = message.member
        let userPermLevel = getPermissionLevel(member)

        if (command.permissions !== undefined && userPermLevel > command.permissions) {
            return message.reply("You do not have permission to run this command.")
        }

        let profile = await Blacklist.findOne({
            userID: message.author.id
        })
        if (profile) {
            message.reply(`You have been blacklisted to use the bot for ${profile.reason}.`)
            if (getPermissionLevel(message.member) !== -1) return
        }

        try {
            await command.run({ ...bot, message, args })
        } catch (error) {
            let errMsg = error.toString()

            if (errMsg.startsWith("?")) {
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            }
            else {
                addLog(errMsg, error.stack)
            }
        }
    }
}