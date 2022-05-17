const Levels = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: "level",
    category: "levels",
    description: 'Show the level of a user',
    options: [
        {
            name: "user",
            description: "The user you want the level of.",
            type: "USER",
            required: false
        },
    ],
    run: async ({ interaction }) => {
        let target = interaction.options.getUser('user')
        if (!target) {
            target = interaction.user
        }

        const user = await Levels.fetch(target.id, interaction.guild.id, true); // Selects the target from the database.

        if (!user) await interaction.reply(`${target.username} has no level on this server.`)
 
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
                await interaction.reply({files: [attachment]});
            });
    }
}