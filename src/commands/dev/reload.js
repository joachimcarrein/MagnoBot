const Discord = require("discord.js")

module.exports = {
    name: "reload",
    aliases: ["r"],
    category: "dev",
    Permissions: -1,
    description: "reloads the bot",
    run: async (bot) => {
        var { client, message, config } = bot;
        await client.loadCommands(bot, true);
        await client.loadEvents(bot, true);
        await client.loadButtons(bot, true)

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
                    ]))
            ]
        })
    }
}