const Log = require('../_database/models/logSchema')
const mongoose = require('mongoose')

async function addLog(content, stacktrace) {
    console.log(content)
    let log = await new Log({
        _id: mongoose.Types.ObjectId(),
        content: content,
        stacktrace: stacktrace
    })
    await log.save().catch(error => console.log(error))
}

async function getLogs(number) {
    let log = await Log.find({}).sort('-createdAt').limit(number).exec()
    let logs = []
    log.forEach(l => {
        logs.push([`\`${l.createdAt.toJSON()}\``, l.content])
    })
    return logs
}

async function clearLogs() {
    await Log.deleteMany({})
}

module.exports = {
    name: "logs",
    addLog,
    getLogs,
    clearLogs
}