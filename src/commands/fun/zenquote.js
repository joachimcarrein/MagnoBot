const {fetch} = require("../../util/functions")

module.exports = {
    name: "zenquote",
    category: "fun",
    permissions: [],
    adminOnly: false,
    run: async ({ client, message, args }) => {
        getQuote().then(quote => message.channel.send(quote))
    }
}

function getQuote() {
    return fetch("https://zenquotes.io/api/random", null)
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}
