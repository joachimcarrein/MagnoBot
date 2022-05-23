module.exports = {
    name: "restartbot",
    category: "hidden",
    permissions: -1,
    description: 'Restart bot',
    run: async (bot) => {
        const { message, args } = bot
        const request = args.join(" ")
        const os = require("os")
        let restartBot = true

        if (!!request) {
            restartBot = (request.toLowerCase() === os.hostname().toLowerCase())
        }

        if (restartBot) {
            try {
                await message.reply(`Restarting bot on \`${os.hostname()}\``)
            } catch (error) {
                
            }
            bot.restart()
        } else {
            await message.reply(`bot is not \`${request}\` but \`${os.hostname()}\`, skipping restart.`)
        }
    }
}