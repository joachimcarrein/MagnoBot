const { channel } = require("diagnostics_channel")
const Discord = require("discord.js")
module.exports = {
    name: "snipe",
    aliases: [],
    category: "fun",
    permissions: 2,
    run: async ({ client, message, args }) => {        
        const msg = client.snipes.get(message.channel.id)

        if (!msg) return message.channel.send("Nothing to snipe in channel yet.")
        const snipeEmbed = new Discord.MessageEmbed()
        .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL()})
        .setDescription(msg.content)

        message.channel.send({embeds: [snipeEmbed]})
    }
}


