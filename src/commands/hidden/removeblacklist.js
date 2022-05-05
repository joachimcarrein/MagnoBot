const Discord = require("discord.js")
const fs = require("fs")
const mongoose = require('mongoose')
const Blacklist = require('../../_database/models/blacklistSchema')

module.exports = {
    name: "removeblacklist",
    aliases: [],
    category: "hidden",
    Permissions: -1,
    description: "remove a user from the blacklist",
    usage: "",
    run: async (bot) => {
        var { client, message, config, args } = bot;

        const mentionedMember = message.mentions.users.first() || message.guild.members.cache.find(entry => entry.user.username === args[0]).user

        if (!args[0]) return message.channel.send('No arguments supplied')
        if (!mentionedMember) return message.channel.send('No member supplied')

        let profile = await Blacklist.findOne({
            userID: mentionedMember.id
        })

        if (!profile) {
            return message.reply(`user ${mentionedMember.username} not blacklisted`)
        }

        try {
            await profile.delete()
            message.reply(`user ${mentionedMember.username} cleared from blacklist`)
        } catch (error) {
            console.log(error)
        }
    }
}