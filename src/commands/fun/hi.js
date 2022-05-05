module.exports = {
    name: "hi",
    aliases: [],
    category: "fun",
    description: "Replies with Hi user",
    usage: "[text]",
    run: async ({ client, message, args }) => {
        if (args.length === 0) {
            message.reply(`Hi, <@${message.author.id}>!`)
        } else {
            message.reply(`<@${message.author.id}> says hi: ${args.join(" ")}`)
        }
    }
}


