module.exports = {
    name: "botlogs",
    category: "logs",
    permissions: -1,
    description: 'Get the bot logs',
    options: [
        {
            name: "number",
            description: "The number of lines to return.",
            type: "INTEGER",
            required: false,
            minValue: 1
        },
    ],
    run: async ({ client, interaction }) => {
        let number = interaction.options.getInteger("number")
        if (!number) number = 5

        let logs = await client.functions.get("logs").getLogs(number)
        if (!logs || logs.length == 0) {
            await interaction.reply('No bot logs present')
        } else {
            await interaction.reply('Details:\n' + logs)
        }
    }
}