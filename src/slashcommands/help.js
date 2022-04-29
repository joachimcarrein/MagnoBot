const run = async (client, interaction) => {
    let command = interaction.options.getString("command")
    const help = client.commands.get("help")

    if (!command) {
        interaction.reply({ embeds: [help.getAll(client, interaction, "")] })
    }
    else {
        interaction.reply({ embeds: [help.getCMD(client, interaction, command)] })
    }
}

module.exports = {
    name: "help",
    description: "MagnoBot help.",
    perms: "SEND_MESSAGES",
    options: [
        {
            name: "command",
            description: "The command you want info on.",
            type: "STRING"
        },
    ],
    run
}