module.exports = {
    name: "ego",
    aliases: [],
    category: "fun",
    description: "Simple tryout of react",
    usage: "",
    run: async ({ client, message, args }) => {
        message.react("😀")
        message.reply('wow, what a great post!')
    }
}