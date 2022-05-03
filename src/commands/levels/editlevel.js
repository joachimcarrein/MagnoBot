const Levels = require('discord-xp')
module.exports = {
    name: "editlevel",
    aliases: [],
    category: "levels",
    permissions: 1,
    description: 'edit a user level',
    run: async ({ client, message, args}) => {
        let guildSettings = await client.functions.get("functions").getGuildSettings(message.guild.id)
        let usage = `${guildSettings.prefix}editlevel @member [xp, level] [add, set, remove] <number>`

        if (!args[0]) return message.reply(`Please supply the necessary arguments.\n\`${usage}\``)

        const mentionedMember = message.mentions.users.first() || message.guild.members.cache.find(entry => entry.user.username === args[0])?.user
        if (!mentionedMember) return message.reply('the member stated is not in the server')

        if (!args[1]) return message.reply(`You need to state if editing level or xp.\n\`${usage}\``)
        if (!['xp', 'level'].includes(args[1])) return message.reply(`Your second argument was not level or xp.\n\`${usage}\``)

        if (args[1] == 'xp') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.reply(`You need to state if adding, setting or removing xp.\n\`${usage}\``)
            const value = Number(args[3])
            const levelUser = await Levels.fetch(mentionedMember.id, message.guild.id)
            if (!levelUser) return message.reply(`Member not registered in the database yet.`)
            if (!value) return message.reply(`The number is not a valid number.\n\`${usage}\``)
            if (args[2] == 'add') {
                try {
                    await Levels.appendXp(mentionedMember.id, message.guild.id, value)
                    message.reply(`Added ${value} xp to ${mentionedMember.username}`)
                } catch (error) {
                    console.log(error)
                }
            } else if (args[2] == 'remove') {
                try {
                    await Levels.subtractXp(mentionedMember.id, message.guild.id, value)
                    message.reply(`Removed ${value} xp from ${mentionedMember.username}`)
                } catch (error) {
                    console.log(error)
                }
            } else if (args[2] == 'set') {                
                try {
                    await Levels.setXp(mentionedMember.id, message.guild.id, value)
                    message.reply(`Set ${value} xp for ${mentionedMember.username}`)
                } catch (error) {
                    console.log(error)
                }
            }
        } else if (args[1] == 'level') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.reply(`You need to state if adding, setting or removing levels.\n\`${usage}\``)
            const value = Number(args[3])
            const levelUser = await Levels.fetch(mentionedMember.id, message.guild.id)
            if (!levelUser) return message.reply(`Member not registered in the database yet.`)
            if (!value) return message.reply(`The number is not a valid number.\n\`${usage}\``)
            if (args[2] == 'add') {
                try {
                    await Levels.appendLevel(mentionedMember.id, message.guild.id, value)
                    message.reply(`Added ${value} levels to ${mentionedMember.username}`)
                } catch (error) {
                    console.log(error)
                }
            } else if (args[2] == 'remove') {
                try {
                    await Levels.subtractLevel(mentionedMember.id, message.guild.id, value)
                    message.reply(`Removed ${value} levels from ${mentionedMember.username}`)
                } catch (error) {
                    console.log(error)
                }
            } else if (args[2] == 'set') {                
                try {
                    await Levels.setLevel(mentionedMember.id, message.guild.id, value)
                    message.reply(`Set ${value} levels for ${mentionedMember.username}`)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}