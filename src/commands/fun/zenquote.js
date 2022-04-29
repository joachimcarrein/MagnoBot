module.exports = {
    name: "zenquote",
    aliases: ["zq"],
    category: "fun",
    permissions: 2,
    run: async ({ client, message, args }) => {
        getQuote().then(quote => message.channel.send(quote))
    }
}

function getQuote() {
    return client.functions.get("functions").fetch("https://zenquotes.io/api/random", null)
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}
