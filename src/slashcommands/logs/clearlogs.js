module.exports = {
    name: "clearlogs",
    category: "logs",
    permissions: -1,
    description: 'Clear the botlogs',
    run: async ({ client, interaction }) => {

        await client.functions.get("logs").clearLogs()

        await interaction.reply('Logs cleared')
    }
}