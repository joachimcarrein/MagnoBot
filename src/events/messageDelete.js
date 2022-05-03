module.exports = {
    name: "messageDelete",
    run: async (bot, message) => {
        const {client} = bot
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author
        })
    }
}