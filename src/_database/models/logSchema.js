const mongoose = require("mongoose")

const logSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: String,
    stackTrace: String
}, { timestamps: true })

module.exports = new mongoose.model('Log', logSchema, 'logs')