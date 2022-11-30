const Discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command's info",
    usage: "[command | alias]",
    global: true,
    run: async (bot) => {
        let { client, message, args } = bot;
    
        let embed = null
        let guildSettings = await client.functions.get("functions").getGuildSettings(message.guild.id)

        if (args[0]) 
            embed = getCMD(client, message, args[0], guildSettings.prefix);
        else 
            embed = getAll(client, message, guildSettings.prefix);

        if (!embed) return

        return message.channel.send({embeds: [embed]})
    },
    getCMD,
    getAll
};
function getAll(client, message, prefix) {
    // let reacts = [
    //     ":tools:",
    //     ":information_source:"
    // ];
    let embedfields = [];
    client.categories.forEach(c => {
        if (c == "hidden") return;
        embedfields.push([
            c,
            client.commands
                .filter(cmd => cmd.category === c)
                .map(cmd => `\`${cmd.name}\``)
                .join(", "),
        ]);
    });
    // for (var i = 0; i < embedfields.length; i++) {
    //     embedfields[i][0] = `${reacts[i]} ${embedfields[i][0][0].toUpperCase() +
    //         embedfields[i][0].substring(1)}`;
    // }

    //FIX change image to bot pfp auto link
    var em = new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Blurple)
        .setAuthor({
            name: "Bot Commands",
            iconURL: message.guild.iconURL({ dynamic: true })
        })

    embedfields.forEach(b => {
        em.addField(b[0], b[1], true);
    });

    em.setFooter({
        text: `Use ${prefix}help <command> for more info on a specific command\n[Command count: ` +
            client.commands.size +
            "]"
    })

    return em
}
function getCMD(client, message, input, prefix) {
    const embed = new Discord.EmbedBuilder();
    const cmd =
        client.commands.get(input.toLowerCase()) ||
        client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `No information found for command **${input.toLowerCase()}**`;
    if (!cmd)
        //no specified command
        return message.channel.send(embed.setColor(Discord.Colors.Red).setDescription(info));

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases)
        info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${prefix}${cmd.name} ${cmd.usage}`;
        embed.setFooter({ text: `Syntax: <> = required, [] = optional` });
    }
    return embed.setColor(Discord.Colors.Green).setDescription(info)
}
