module.exports = {
    name: "restartbot",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Restart bot',
    usage: "",
    run: async (bot) => {
        var { message } = bot;
        const os = require("os")
        await message.reply(`Restarting bot on \`${os.hostname()}\``)
        bot.restart()
    }
}