const { MessageEmbed } = require("discord.js")
const fs = require('fs')

module.exports = {
    name: "test",
    category: "fun",
    description: "just a test command",
    run: async ({ client, interaction }) => {

        console.log(new Date().toJSON())
    }
}


