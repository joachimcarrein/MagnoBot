module.exports = {
    name: "ping",
    category: "info",
    permissions: [],
    adminOnly: false,
    run: async ({client, message, args}) => {
        message.reply("Pong")
    }
}