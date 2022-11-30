const mongoose = require('mongoose')
const Blacklist = require('../../_database/models/blacklistSchema')
const { addLog } = require('../../functions/logs')
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "blacklist",
    category: "hidden",
    Permissions: -1,
    description: "blacklist a user from using the bot",
    options: [
        {
            name: "user",
            description: "The user to add to the blacklist",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "The reason for adding the user to the blacklist",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async (bot) => {
        var { interaction } = bot;

        const mentionedMember = interaction.options.getUser("user")
        let reason = interaction.options.getString("reason")

        let profile = await Blacklist.findOne({
            userID: mentionedMember.id
        })

        if (profile) {
            return await interaction.reply(`user ${mentionedMember.username} already blacklisted for ${profile.reason}`)
        }

        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.id,
            reason: reason
        })

        try {
            await profile.save()
            await interaction.reply(`user ${mentionedMember.username} blacklisted for ${profile.reason}`)
        } catch (error) {
            addLog(error, error.stack)
        }
    }
}