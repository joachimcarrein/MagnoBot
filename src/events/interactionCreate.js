const Discord = require("discord.js")

module.exports = {
    name: "interactionCreate",
    run: async function runAll(bot, interaction) {

        if (interaction.isCommand()) handleSlashCommand(bot, interaction)
        else if (interaction.isButton()) handleButton(bot, interaction)
    }
}

const handleButton = (bot, interaction) => {
    const {client} = bot

    // "name-param1-param2-..."

    const [name,...params] = interaction.customId.split('-')

    const button = client.buttons.get(name)

    if (!button) return
    button.run(client, interaction, params)
}

const handleSlashCommand = (bot, interaction) => {
    const {client} = bot

    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return

    if (slashcmd.permissions && interaction.member.permissions.missing(slashcmd.permissions).length !== 0)
        return interaction.reply("You do not have permission to run this slashcommand.")

    slashcmd.run(client, interaction)
}