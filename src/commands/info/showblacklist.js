const Discord = require("discord.js")
const fs = require("fs")
const mongoose = require('mongoose')
const Blacklist = require('../../_database/models/blacklistSchema')

module.exports = {
    name: "showblacklist",
    aliases: [],
    category: "info",
    description: "Show all blacklisted users",
    usage: "",
    run: async (bot) => {
        var { client, message, config, args } = bot;


        let profiles = await Blacklist.find()
        let printProfile = []

        await profiles.forEach(async profile => {
            const member = await message.guild.members.fetch(profile.userID)
            printProfile.push([member.user.username, profile.reason])
        })

        if (printProfile.length === 0) {
            return message.reply('blacklist is empty')
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#8DC685")
            .setTitle("Blacklisted users")
            .setDescription(client.functions.get("functions").autoAlign(printProfile))

        embed = client.functions.get("functions").setEmbedFooter(embed, client)

        message.channel.send({ embeds: [embed] })
    }
}