require("dotenv").config()

const fs = require("fs")

const Levels = require('discord-xp')
const mongoose = require("./_database/mongoose")
//const keepAlive = require('./server')
//keepAlive()

let dev = ''
if (fs.existsSync(".dev"))
    dev = "dev_"
const connString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}/${dev}${process.env.MONGODB_DB}?retryWrites=true&w=majority`
Levels.setURL(connString)

const Bot = require("./classes/bot")
let bot

mongoose.init(connString)

const start = ((reboot) => {
    
    bot = new Bot()

    bot.eventEmitter.once("botrestart", async () => {
        console.clear()
        console.log('********************************')
        console.log('Process has exited. Rebooting...')
        console.log('********************************')
        start(true)
    })

    bot.start()
})

start(false)

module.exports = bot, start