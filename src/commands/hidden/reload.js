const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "reload",
    aliases: ["r"],
    category: "hidden",
    Permissions: 0,
    description: "reloads the bot",
    usage: "",
    run: async (bot) => {
        var { client, message, config } = bot;
        await client.loadCommands(bot, true);
        await client.loadEvents(bot, true);
        await client.loadButtons(bot, true)
        await client.loadSlashCommands(bot, true)
        await client.loadFunctions(bot, true);
        client.categories = fs.readdirSync("./src/commands/");
        client.slashcategories = fs.readdirSync("./src/slashcommands/");

        await client.announceSlashCommands(bot)

        const os = require("os")

        let embed = new Discord.MessageEmbed()
            .setColor("#8DC685")
            .setTitle(`Bot Reload Complete on \`${os.hostname()}\``)
            .setDescription(client.functions.get("functions").autoAlign([
                [`\`${client.commands.size}\``, `Commands`],
                [`\`${client.aliases.size}\``, `Aliases`],
                [`\`${client.events.size}\``, `Events`],
                [`\`${client.buttons.size}\``, `Buttons`],
                [`\`${client.slashcommands.size}\``, `SlashCommands`],
                [`\`${client.functions.size}\``, `Functions`],
            ]))

        embed = client.functions.get("functions").setEmbedFooter(embed, client)

        message.channel.send({ embeds: [embed] })
    }
}