const Discord = require("discord.js")
module.exports = {
    name: "settings",
    aliases: [],
    category: "info",
    permissions: 0,
    description: 'Guild bot settings',
    run: async ({ client, message, args }) => {
        let guildSettings = await client.functions.get("functions").getGuildSettings(message.guild.id)

        if (!args.length) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`MagnoBot Server Settings: ${message.guild.name}`)
                .setColor('RED')
                .setDescription("If nothing is shown, there are no properties assigned\nProperties: Prefix")
                
                if (guildSettings.prefix) embed.addField("Prefix",guildSettings.prefix)
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