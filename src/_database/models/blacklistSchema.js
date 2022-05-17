const mongoose = require("mongoose")

const blacklistSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    reason: String
}, { timestamps: true })

module.exports = new mongoose.model('BlackList', blacklistSchema, 'blacklists')