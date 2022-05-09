module.exports = {
    name: "messageDelete",
    run: async (bot, message) => {
        const {client} = bot
        
        if (message.author.bot) return // ignore deleted bot messages

        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author
        })
    }
}