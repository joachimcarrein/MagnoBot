const Discord = require("discord.js")
const Blacklist = require('../../_database/models/blacklistSchema')

module.exports = {
    name: "showblacklist",
    category: "info",
    description: "Show all blacklisted users",
    run: async (bot) => {
        var { client, interaction} = bot;

        let profiles = await Blacklist.find()
        let printProfile = []

        await profiles.forEach(async profile => {
            const member = await interaction.guild.members.fetch(profile.userID)
            printProfile.push([member.user.username, profile.reason])
        })

        if (printProfile.length === 0) {
            return await interaction.reply('blacklist is empty')
        }

        let embed = new Discord.EmbedBuilder()
            .setColor("#8DC685")
            .setTitle("Blacklisted users")
            .setDescription(client.functions.get("functions").autoAlign(printProfile))

        embed = client.functions.get("functions").setEmbedFooter(embed, client)

        await interaction.reply({ embeds: [embed] })
    }
}