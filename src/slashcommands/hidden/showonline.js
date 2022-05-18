module.exports = {
    name: "showonline",
    category: "hidden",
    permissions: -1,
    description: 'Show all bots online',
    run: async ({ client, interaction }) => {
        const os = require("os")

        await interaction.channel.send(`online on \`${os.hostname()}\``)
        try {
            await interaction.reply({ content: "sending normal channel message", ephemeral: true })
        } catch (error) {            
        }
    }
}