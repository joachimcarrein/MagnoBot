module.exports = {
    name: "ego",
    aliases: [],
    category: "fun",
    run: async ({ client, message, args }) => {
        message.react("😀")
        message.reply('wow, what a great post!')
    }
}