const mongoose = require("mongoose")

const blacklistSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    reason: String
})

module.exports = new mongoose.model('BlackList',blacklistSchema, 'blacklists')