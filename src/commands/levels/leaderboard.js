const Levels = require('discord-xp')
module.exports = {
    name: "leaderboard",
    aliases: [],
    category: "levels",
    description: 'Show the servers top 5 leaderboard',
    run: async ({ client, message, args }) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5)

        if (rawLeaderboard.length < 1) return message.reply('No leaderboard yet.')

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)
        const lb = leaderboard.map(e => `${e.position}. ${e.username}\nLevel: ${e.level}\nXP: ${e.xp}`)
        message.channel.send(`**Leaderboard**:\n\n${lb.join('\n\n')}`)
    }
}