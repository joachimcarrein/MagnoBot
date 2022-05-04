const Levels = require('discord-xp')
module.exports = {
    name: "addxp",
    aliases: [],
    category: "levels",
    permissions: 20,
    description: 'add xp to a user',
    run: async ({ client, message, args }) => {
        let mentionedMember = message.mentions.users.first() || message.guild.members.cache.find(entry => entry.user.username === args[0])?.user
        if (!mentionedMember) mentionedMember = message.member.user

        const xpToAdd = args[1]

        await Levels.appendXp(mentionedMember.id, message.guild.id, xpToAdd)
        await message.reply(`Added ${xpToAdd} xp to ${mentionedMember.username}`)
    }
}