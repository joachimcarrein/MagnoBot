const mongoose = require("mongoose")

module.exports = {
    init: (connString) => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4
        }

        mongoose.connect(connString, dbOptions)
        mongoose.Promise = global.Promise
        mongoose.connection.on('connected', () => {
            console.log('bot has connected to mongo')
        })

        mongoose.connection.on('disconnected', () => {
            console.log('bot has disconnected to mongo')
        })

        mongoose.connection.on('error', (err) => {
            console.log('There was a mongo connection error: ' + err)
        })
    },
    disconnect: () => {
        mongoose.disconnect()
    }
}