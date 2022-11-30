const { ApplicationCommandOptionType } = require('discord.js');
const Levels = require('discord-xp')
module.exports = {
    name: "addxp",
    category: "levels",
    permissions: 20,
    description: 'add xp to a user',
    options: [
        {
            name: "user",
            description: "The user you want to change.",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "xp",
            description: "The amount of XP to add.",
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
    ],
    run: async ({ interaction }) => {
        const mentionedMember = interaction.options.getUser('user');
        const xpToAdd = interaction.options.getInteger('xp');        

        await Levels.appendXp(mentionedMember.id, interaction.guild.id, xpToAdd)
        await interaction.reply(`Added ${xpToAdd} xp to ${mentionedMember.username}`)
    }
}