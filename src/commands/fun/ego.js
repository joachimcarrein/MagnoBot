module.exports = {
    name: "ego",
    category: "fun",
    permissions: [],
    adminOnly: false,
    run: async ({ client, message, args }) => {
        message.react("😀")
        message.reply('wow, what a great post!')
    }
}