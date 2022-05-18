module.exports = {
    name: "killbot",
    category: "hidden",
    permissions: -1,
    description: 'Kill bot process.',
    options: [
        {
            name: "server",
            description: "The hostname of the bot process you want killed",
            type: "STRING",
            required: false
        },
    ],
    run: async (bot) => {
        var { interaction } = bot;

        const request = interaction.options.getString("server")
        const os = require("os")
        let killBot = true

        if (!!request) {
            killBot = (request.toLowerCase() === os.hostname().toLowerCase())
        }

        if (killBot) {
            try {
                await interaction.reply(`Killing bot process on \`${os.hostname()}\`. No recovery from this... 😵🪦`)
            } catch (error) {
                
            }
            bot.killBot()
            await interaction.reply("Something went wrong, bot still here...")
        } else {
            await interaction.reply(`bot is not \`${request}\` but \`${os.hostname()}\`, skipping kill.`)
        }
    }
}