const Discord = require("discord.js")
const Levels = require('discord-xp')
module.exports = {
    name: "leaderboard",
    aliases: ["lb"],
    category: "levels",
    description: 'Show the servers top 5 leaderboard',
    run: async ({ client, message, args }) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5)

        if (rawLeaderboard.length < 1) return message.reply('No leaderboard yet.')

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)

        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Leaderboard")

        leaderboard.forEach(e => {
            embed.addField(`**${e.position}**. ${e.username}`, `**Level**: \`${e.level}\`\n**XP**: \`${e.xp}\``)
        })
        message.channel.send({ embeds: [embed] })
    }
}