const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: "setplaying",
    category: "hidden",
    permissions: -1,
    description: 'Set the bot "IsPlaying" status',
    options: [
        {
            name: "status",
            description: "The new bot status.",
            type: ApplicationCommandOptionType.String,
            required: false
        },
    ],
    run: async ({ client, interaction }) => {
        const status = interaction.options.getString("status")
        if (!status) {
            client.user.setPresence({ activity: null })
        } else {
            client.user.setPresence({ activities: [{ name: status }] });
        }
        await interaction.reply({ content: "Bot status updated", ephemeral: true })
    }
}