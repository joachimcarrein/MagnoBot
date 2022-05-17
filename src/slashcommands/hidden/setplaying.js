module.exports = {
    name: "setplaying",
    category: "hidden",
    permissions: -1,
    description: 'Set the bot "IsPlaying" status',
    options: [
        {
            name: "status",
            description: "The new bot status.",
            type: "STRING",
            required: false
        },
    ],
    run: async ({ client, interaction }) => {
        const status = interaction.options.getString("status")
        client.user.setPresence({ activities: [{ name: status }] });
        interaction.reply({content: "Bot status updated", ephemeral: true})
    }
}