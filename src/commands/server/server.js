const Discord = require("discord.js")
module.exports = {
    name: "server",
    aliases: [],
    category: "server",
    run: async ({ client, message, args }) => {
        let serverEmbed = new Discord.MessageEmbed()
            .setColor("DARK_GOLD")

        switch (args[0]) {
            case 'members':
                const serverMembers = message.guild.memberCount;
                serverEmbed.setTitle(`${message.guild.name} has ${serverMembers} members.`)
                break;
            case 'boosts':
                const serverBoosts = message.guild.premiumSubscriptionCount
                serverEmbed.setTitle(`${message.guild.name} has ${serverBoosts} boosts of the server.`)
                break;
            case 'joined':
                serverEmbed.setTitle(`You joined ${message.guild.name} at ${message.member.joinedAt}.`)
                break;
            default:
                serverEmbed.setTitle(`Welcome to server ${message.guild.name}`)
                .setDescription('Use one of the following options for more info: members, boosts, joined.')
                break;
        }

        message.channel.send({ embeds: [serverEmbed] })
    }
}


