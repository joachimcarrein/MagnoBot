require("dotenv").config()

const Levels = require('discord-xp')
const mongoose = require("./_database/mongoose")
const keepAlive = require('./server')
keepAlive()

const connString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}`
Levels.setURL(connString)

const Bot = require("./classes/bot")
let bot

const start = ((connString, reboot) => {
    mongoose.init(connString)
    bot = new Bot()

    bot.eventEmitter.once("botrestart", async () => {
        console.clear()
        console.log('********************************')
        console.log('Process has exited. Rebooting...')
        console.log('********************************')
        start(connString, true)
    })

    bot.start()
})

start(connString, false)

module.exports = bot, start