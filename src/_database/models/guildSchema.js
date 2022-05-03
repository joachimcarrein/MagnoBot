const mongoose = require("mongoose")

const guildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: { type: String, default: "!"}
}, { timestamps: true })

module.exports = new mongoose.model('Guild',guildSchema , 'guilds')