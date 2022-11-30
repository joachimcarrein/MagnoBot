const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const { addLog } = require('../../functions/logs')

module.exports = {
    name: "nuke",
    category: "channel",
    permissions: 10,
    description: "Clones the channel and deletes the original",
    usage: "[reason]",
    default_member_permissions: PermissionFlagsBits.Administrator,
    options: [
        {
            name: "reason",
            description: "The reason for the nuke.",
            type: ApplicationCommandOptionType.String,
            required: false
        },
    ],
    run: async ({ interaction }) => {

        // default deletes message itself plus previous
        let reason = interaction.options.getString('reason')
        if (!reason) reason = "no reason given"

        const nukeChannel = interaction.channel
        if (!nukeChannel.deletable) return await interaction.reply("Cannot nuke channel.")

        await nukeChannel.clone().catch(error => {
            addLog(error, error.stack)
        })
        await nukeChannel.delete(reason).catch(error => {
            addLog(error, error.stack)
        })
    }
}