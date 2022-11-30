const Discord = require("discord.js")
module.exports = {
    name: "snipe",
    category: "fun",
    description: "Shows the last deleted message in the channel",
    run: async ({ client, interaction }) => {
        const msg = client.snipes.get(interaction.channel.id)

        if (!msg) return await interaction.reply("Nothing to snipe in channel yet.")
        let snipeEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL() })
            .setDescription(msg.content)

        snipeEmbed = client.functions.get("functions").setEmbedFooter(snipeEmbed, client)

        await interaction.reply({ embeds: [snipeEmbed] })
    }
}


