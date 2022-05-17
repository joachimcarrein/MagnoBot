module.exports = {
    name: "nuke",
    category: "channel",
    permissions: 10,
    description: "Clones the channel and deletes the original",
    usage: "[reason]",
    options: [
        {
            name: "reason",
            description: "The reason for the nuke.",
            type: "STRING",
            required: false
        },
    ],
    run: async ({ interaction }) => {

        // default deletes message itself plus previous
        let reason = interaction.options.getString('reason')
        if (!reason) reason = "no reason given"

        const nukeChannel = interaction.channel
        if (!nukeChannel.deletable) return interaction.reply("Cannot nuke channel.")

        await nukeChannel.clone().catch(error => {
            const addLog = require('../../functions/logs')
            addLog(error, error.stack)
        })
        await nukeChannel.delete(reason).catch(error => {
            const addLog = require('../../functions/logs')
            addLog(error, error.stack)
        })
    }
}