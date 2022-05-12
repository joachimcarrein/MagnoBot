const { MessageEmbed } = require("discord.js")
const fs = require('fs')

module.exports = {
    name: "test",
    aliases: [],
    category: "fun",
    description: "just a test command",
    usage: "",
    run: async ({ client, message, args }) => {

        let EnvKeys = fs.readFileSync('.env').toString().split('\n')
        EnvKeys.forEach((e, i) => {
            e = e.split('=')[0]
            EnvKeys.splice(i, 1, e)
        })

        let embed = new MessageEmbed()
            .setDescription(`data: ${EnvKeys}`)

        embed = client.functions.get("functions").setEmbedFooter(embed, client)

        return message.channel.send({ embeds: [embed] });
    }
}


