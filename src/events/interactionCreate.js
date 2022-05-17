const Discord = require("discord.js")

module.exports = {
    name: "interactionCreate",
    run: async function runAll(bot, interaction) {

        if (interaction.isCommand()) handleSlashCommand(bot, interaction)
        else if (interaction.isButton()) handleButton(bot, interaction)
    }
}

const handleButton = async (bot, interaction) => {
    const { client } = bot

    // "name-param1-param2-..."

    const [name, ...params] = interaction.customId.split('-')

    const button = client.buttons.get(name)

    if (!button) return
    try {
        await button.run(client, interaction, params)
    } catch (error) {
        const addLog = require('../functions/logs')
        addLog(error, error.stack)
    }
}

const handleSlashCommand = async (bot, interaction) => {
    const { client } = bot

    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return

    if (slashcmd.permissions && interaction.member.permissions.missing(slashcmd.permissions).length !== 0)
        return interaction.reply("You do not have permission to run this slashcommand.")

    try {
        await slashcmd.run({ ...bot, interaction })
    } catch (error) {
        const { addLog } = require('../functions/logs')
        addLog(error, error.stack)
    }
}