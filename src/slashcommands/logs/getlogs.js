const Discord = require("discord.js")
module.exports = {
    name: "getlogs",
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

        let embed = new Discord.MessageEmbed()
            .setColor("DARK_GOLD")
            .setTitle(`Bot Logs`)

        let logs = await client.functions.get("logs").getLogs(number)
        if (!logs || logs.length == 0) {
            embed.setDescription('No bot logs present')
        } else {
            embed.setDescription('Details:\n' + client.functions.get("functions").autoAlign(logs))
        }

        client.functions.get("functions").setEmbedFooter(embed, client)

        await interaction.reply({ embeds: [embed] })
    }
}