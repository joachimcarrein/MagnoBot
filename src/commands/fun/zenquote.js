module.exports = {
    name: "zenquote",
    aliases: ["zq"],
    category: "fun",
    description: "Shows a random zenquote",
    usage: "",
    run: async ({ client, message, args }) => {
        getQuote(client).then(quote => message.channel.send(quote))
    }
}

function getQuote(client) {
    return client.functions.get("functions").fetch("https://zenquotes.io/api/random", null)
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}
