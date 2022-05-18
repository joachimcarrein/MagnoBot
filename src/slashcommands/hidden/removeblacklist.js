const Blacklist = require('../../_database/models/blacklistSchema')
const addLog = require('../../functions/logs')

module.exports = {
    name: "removeblacklist",
    category: "hidden",
    Permissions: -1,
    description: "remove a user from the blacklist",
    options: [
        {
            name: "user",
            description: "The user to add to the blacklist",
            type: "USER",
            required: true
        }
    ],
    run: async ({ interaction }) => {
        const mentionedMember = interaction.options.getUser("user")

        let profile = await Blacklist.findOne({
            userID: mentionedMember.id
        })

        if (!profile) {
            return await interaction.reply(`user ${mentionedMember.username} not blacklisted`)
        }

        try {
            await profile.delete()
            await interaction.reply(`user ${mentionedMember.username} cleared from blacklist`)
        } catch (error) {            
            addLog(error, error.stack)
        }
    }
}