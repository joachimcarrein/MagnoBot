module.exports = {
    name: "showonline",
    category: "hidden",
    permissions: -1,
    description: 'Show all bots online',
    run: async ({ message }) => {
        const os = require("os")

        await interaction.channel.send(`online on \`${os.hostname()}\``)
    }
}