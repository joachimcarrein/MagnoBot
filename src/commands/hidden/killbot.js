module.exports = {
    name: "killbot",
    category: "hidden",
    permissions: -1,
    description: 'Kill bot process.',
    run: async (bot) => {
        var { message, args } = bot;

        const request = args.join(' ')
        const os = require("os")
        let killBot = true

        if (!!request) {
            killBot = (request.toLowerCase() === os.hostname().toLowerCase())
        }

        if (killBot) {
            try {
                await message.reply(`Killing bot process on \`${os.hostname()}\`. No recovery from this... 😵🪦`)
            } catch (error) {
                
            }
            bot.killBot()
            await message.reply("Something went wrong, bot still here...")
        } else {
            await message.reply(`bot is not \`${request}\` but \`${os.hostname()}\`, skipping kill.`)
        }
    }
}