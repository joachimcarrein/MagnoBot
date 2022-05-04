const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "reload",
    aliases: ["r"],
    category: "hidden",
    Permissions: 0,
    description: "reloads the bot",
    run: async (bot) => {
        var { client, message, config } = bot;
        await client.loadCommands(bot, true);
        await client.loadEvents(bot, true);
        await client.loadButtons(bot, true)
        await client.loadSlashCommands(bot, true)
        client.categories = fs.readdirSync("./src/commands/");

        await client.announceSlashCommands(bot)

        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("#8DC685")
                    .setTitle("Bot Reload Complete")
                    .setDescription(client.functions.get("functions").autoAlign([
                        [`\`${client.commands.size}\``, `Commands`],
                        [`\`${client.aliases.size}\``, `Aliases`],
                        [`\`${client.events.size}\``, `Events`],
                        [`\`${client.buttons.size}\``, `Buttons`],
                        [`\`${client.slashcommands.size}\``, `SlashCommands`],
                    ]))
            ]
        })
    }
}