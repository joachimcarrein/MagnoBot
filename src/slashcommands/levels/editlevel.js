const Levels = require('discord-xp')
const { addLog } = require('../../functions/logs')
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "editlevel",
    category: "levels",
    permissions: 20,
    description: 'edit a user level',
    options: [
        {
            name: "user",
            description: "User to change",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "what",
            description: "What to update",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "xp",
                    value: "xp"
                },
                {
                    name: "level",
                    value: "level"
                }
            ],
            required: true
        },
        {
            name: "action",
            description: "What to do",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "add",
                    value: "add"
                },
                {
                    name: "set",
                    value: "set"
                },
                {
                    name: "remove",
                    value: "remove"
                }
            ],
            required: true
        },
        {
            name: "number",
            description: "amount to change",
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
    ],
    run: async ({ interaction }) => {
        const mentionedMember = interaction.options.getUser("user")
        const whatToUpdate = interaction.options.getString("what")
        const action = interaction.options.getString("action")
        const value = interaction.options.getInteger("number")

        if (whatToUpdate == 'xp') {
            const levelUser = await Levels.fetch(mentionedMember.id, interaction.guild.id)
            if (!levelUser) return await interaction.reply(`Member not registered in the database yet.`)
            if (action == 'add') {
                try {
                    await Levels.appendXp(mentionedMember.id, interaction.guild.id, value)
                    await interaction.reply(`Added ${value} xp to ${mentionedMember.username}`)
                } catch (error) {
                    addLog(error, error.stack)
                }
            } else if (action == 'remove') {
                try {
                    await Levels.subtractXp(mentionedMember.id, interaction.guild.id, value)
                    await interaction.reply(`Removed ${value} xp from ${mentionedMember.username}`)
                } catch (error) {
                    addLog(error, error.stack)
                }
            } else if (action == 'set') {
                try {
                    await Levels.setXp(mentionedMember.id, interaction.guild.id, value)
                    await interaction.reply(`Set ${value} xp for ${mentionedMember.username}`)
                } catch (error) {
                    addLog(error, error.stack)
                }
            }
        } else if (whatToUpdate == 'level') {
            const levelUser = await Levels.fetch(mentionedMember.id, interaction.guild.id)
            if (!levelUser) return await interaction.reply(`Member not registered in the database yet.`)
            if (action == 'add') {
                try {
                    await Levels.appendLevel(mentionedMember.id, interaction.guild.id, value)
                    await interaction.reply(`Added ${value} levels to ${mentionedMember.username}`)
                } catch (error) {
                    addLog(error, error.stack)
                }
            } else if (action == 'remove') {
                try {
                    await Levels.subtractLevel(mentionedMember.id, interaction.guild.id, value)
                    await interaction.reply(`Removed ${value} levels from ${mentionedMember.username}`)
                } catch (error) {
                    addLog(error, error.stack)
                }
            } else if (action == 'set') {
                try {
                    await Levels.setLevel(mentionedMember.id, interaction.guild.id, value)
                    await interaction.reply(`Set ${value} levels for ${mentionedMember.username}`)
                } catch (error) {
                    addLog(error, error.stack)
                }
            }
        }
    }
}