const Discord = require("discord.js")
const fs = require("fs")
const mongoose = require('mongoose')
const Blacklist = require('../../_database/models/blacklistSchema')

module.exports = {
    name: "blacklist",
    aliases: [],
    category: "hidden",
    Permissions: -1,
    description: "blacklist a user",
    run: async (bot) => {
        var { client, message, config, args } = bot;

        const mentionedMember = message.mentions.users.first() || message.guild.members.cache.find(entry => entry.user.username === args[0]).user        
        let reason = args.slice(1).join(" ")

        if (!args[0]) return message.channel.send('No arguments supplied')
        if (!mentionedMember) return message.channel.send('No member supplied')
        if (!reason) return message.channel.send('no reason given');

        let profile = await Blacklist.findOne({
            userID: mentionedMember.id
        })        

        if (profile) {
            return message.reply(`user ${mentionedMember.username} already blacklisted for ${profile.reason}`)
        }

        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.id,
            reason: reason
        })

        try {
            await profile.save()
            message.reply(`user ${mentionedMember.username} blacklisted for ${profile.reason}`)
        } catch (error) {
            console.log(error)
        }
    }
}