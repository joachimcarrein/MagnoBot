module.exports = {
    name: "ego",
    aliases: [],
    category: "fun",
    permissions: 2,
    run: async ({ client, message, args }) => {
        message.react("😀")
        message.reply('wow, what a great post!')
    }
}