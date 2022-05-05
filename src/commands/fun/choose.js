const Discord = require("discord.js")

module.exports = {
    name: "choose",
    aliases: [],
    category: "fun",
    description: "let the bot choose one of your options, separate with space, if spaces in your string, use |",
    usage: "<option> [option] ...",
    run: async ({ client, message, args }) => {
        const choices = args.join(" ").split(args.includes("|") ? "|" : " ")

        const choice = choices[Math.floor(Math.random() * choices.length)]

        let embed = new Discord.MessageEmbed()
            .setColor("GOLD")
            .setTitle("I choose:")
            .setDescription(`\`\`\`css\n${choice.trim()}\`\`\``)

        embed = client.functions.get("functions").setEmbedFooter(embed, client)

        message.channel.send({ embeds: [embed] })
    }
}


