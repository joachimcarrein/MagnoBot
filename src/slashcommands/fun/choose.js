const Discord = require("discord.js")
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "choose",
    category: "fun",
    description: "let the bot choose one of your options, separate with space, if spaces in your string, use |",
    options: [
        {
            name: "choices",
            description: "The choices, separate with space of |.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async ({ client, interaction }) => {
        let choices = interaction.options.getString("choices")
        choices = choices.split(choices.includes("|") ? "|" : " ")

        const choice = choices[Math.floor(Math.random() * choices.length)]

        let embed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Gold)
            .setTitle("I choose:")
            .setDescription(`\`\`\`css\n${choice.trim()}\`\`\``)

        embed = client.functions.get("functions").setEmbedFooter(embed, client)

        await interaction.reply({ embeds: [embed] })
    }
}


