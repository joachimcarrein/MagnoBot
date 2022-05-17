module.exports = {
    name: "restartbot",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Restart bot',
    usage: "",
    run: async (bot) => {
        var { message, args } = bot;

        const request = args.join(" ")
        const os = require("os")
        let restartBot = true

        if (!!request) {
            restartBot = (request.toLowerCase() === os.hostname().toLowerCase())
        }

        if (restartBot) {
            await message.reply(`Restarting bot on \`${os.hostname()}\``)
            bot.restart()
        } else {
            await message.reply(`bot is not \`${request}\` but \`${os.hostname()}\`, skipping restart.`)
        }
    }
}