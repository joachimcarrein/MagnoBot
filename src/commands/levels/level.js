const Levels = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: "level",
    aliases: [],
    category: "levels",
    permissions: 2,
    description: 'Show the level of a user',
    run: async ({ client, message, args }) => {
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.

        if (!user) message.reply(`${target.username} has no level on this server.`)
 
        const canvacord = require('canvacord');

        const rank = new canvacord.Rank() // Build the Rank Card
            .setAvatar(target.displayAvatarURL({ format: 'png', size: 512 }))
            .setCurrentXP(user.cleanXp) // Current User Xp for the current level
            .setRequiredXP(user.cleanNextLevelXp) //The required Xp for the next level
            .setRank(user.position) // Position of the user on the leaderboard
            .setLevel(user.level) // Current Level of the user
            .setProgressBar("#FFFFFF")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send({files: [attachment]});
            });
    }
}