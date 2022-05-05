const { channel } = require("diagnostics_channel")
const Discord = require("discord.js")
module.exports = {
    name: "snipe",
    aliases: [],
    category: "fun",
    description: "Shows the last deleted message in the channel",
    usage: "",
    run: async ({ client, message, args }) => {
        const msg = client.snipes.get(message.channel.id)

        if (!msg) return message.channel.send("Nothing to snipe in channel yet.")
        let snipeEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL() })
            .setDescription(msg.content)

        snipeEmbed = client.functions.get("functions").setEmbedFooter(snipeEmbed, client)

        message.channel.send({ embeds: [snipeEmbed] })
    }
}


