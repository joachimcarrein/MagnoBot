module.exports = {
    name: "restartbot",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Restart bot',
    usage: "",
    run: async (bot) => {
        var { message } = bot;
        await message.reply(`Restarting bot`)
        bot.restart()
    }
}