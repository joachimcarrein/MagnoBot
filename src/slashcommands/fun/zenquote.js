module.exports = {
    name: "zenquote",
    category: "fun",
    description: "Shows a random zenquote",
    run: async ({ client, interaction }) => {
        getQuote(client).then(async (quote) => {await interaction.reply(quote)})
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
