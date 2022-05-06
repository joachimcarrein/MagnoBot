module.exports = {
    name: "killbot",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Kill bot process.',
    usage: "",
    run: async (bot) => {
        var {  message } = bot;
        await message.reply("Killing bot process. No recovery from this... 😵🪦")
        bot.killBot()
        await message.reply("Something went wrong, bot still here...")
    }
}