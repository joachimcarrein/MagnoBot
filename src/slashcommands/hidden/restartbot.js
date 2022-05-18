module.exports = {
    name: "restartbot",
    category: "hidden",
    permissions: -1,
    description: 'Restart bot',
    options: [
        {
            name: "server",
            description: "The hostname of the bot process you want to restart",
            type: "STRING",
            required: false
        },
    ],
    run: async (bot) => {
        const { interaction } = bot
        const request = interaction.options.getString("server")
        const os = require("os")
        let restartBot = true

        if (!!request) {
            restartBot = (request.toLowerCase() === os.hostname().toLowerCase())
        }

        if (restartBot) {
            try {
                await interaction.reply(`Restarting bot on \`${os.hostname()}\``)
            } catch (error) {
                
            }
            bot.restart()
        } else {
            await interaction.reply(`bot is not \`${request}\` but \`${os.hostname()}\`, skipping restart.`)
        }
    }
}