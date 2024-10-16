const Discord = require("discord.js")
module.exports = {
    name: "settings",
    aliases: [],
    category: "server",
    permissions: 0,
    description: 'Guild bot server settings',
    usage: "[prefix <value>]",
    run: async ({ client, message, args }) => {
        let guildSettings = await client.functions.get("functions").getGuildSettings(message.guild.id)

        if (!args.length) {
            let embed = new Discord.EmbedBuilder()
                .setTitle(`MagnoBot Server Settings: ${message.guild.name}`)
                .setColor(Discord.Colors.Red)
                .setDescription("If nothing is shown, there are no properties assigned\nProperties: Prefix")
                
                if (guildSettings.prefix) embed.addFields({name: "Prefix", value: guildSettings.prefix})

                embed = client.functions.get("functions").setEmbedFooter(embed, client)
                
                message.channel.send({embeds: [embed]})
        } else {
            const properties = ["prefix"]
            if (!properties.includes(args[0])) return message.reply(`No valid property supplied.\nAllowed Properties: ${properties}`)
            if (!args[1]) return message.reply("No value supplied.")

            if ("prefix" === args[0]) {
                guildSettings.prefix = args[1]
                await guildSettings.save()
                message.reply(`Settings updated: ${args[0]} to ${args[1]}`)
            }
        }
    }
}