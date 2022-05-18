const Discord = require("discord.js")

const run = async ({ client, interaction }) => {
    let command = interaction.options.getString("command")

    if (!command) {
        await interaction.reply({ embeds: [getAll(client, interaction)] })
    }
    else {
        await interaction.reply({ embeds: [getCMD(client, command)] })
    }
}

function getAll(client, interaction) {
    let embedfields = [];
    client.slashcategories.forEach(c => {
        if (c == "hidden") return;
        embedfields.push([
            c,
            client.slashcommands
                .filter(cmd => cmd.category === c)
                .map(cmd => `\`${cmd.name}\``)
                .join(", "),
        ]);
    });

    //FIX change image to bot pfp auto link
    var em = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({
            name: "Bot Commands",
            iconURL: client.user.displayAvatarURL()
        })

    embedfields.forEach(b => {
        em.addField(b[0], b[1]);
    });

    em.setFooter({
        text: `Use /help <command> for more info on a specific command\n[Command count: ` +
            client.slashcommands.size +
            "]"
    })

    return em
}
function getCMD(client, input) {
    const embed = new Discord.MessageEmbed();
    const cmd =
        client.slashcommands.get(input.toLowerCase())
    let info = `No information found for command **${input.toLowerCase()}**`;
    if (!cmd)
        //no specified command
        return embed.setColor("RED").setDescription(info)

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.options) {
        let parameters = ""
        let options = ""
        cmd.options.forEach(option => {
            let bstr = "<"
            let estr = ">"
            if (!option.required) {
                bstr = "["
                estr = "]"
            } 
            let choices = ` - ${option.type}`
            if (option.choices) {
                choices = ` - ${option.choices.map(c => c.name).join(' / ')}`
            }
            parameters += `${bstr}${option.name}${estr} `
            options += `\n\`${option.name}\`: ${option.description}${choices}`
        })

        info += `\n**Usage**: /${cmd.name} ${parameters}`;
        info += `\n**Parameters**: ${options}`     
        embed.setFooter({ text: `Syntax: <> = required, [] = optional` });
    }
    return embed.setColor("GREEN").setDescription(info)
}


module.exports = {
    name: "help",
    description: "MagnoBot help, returns all commands, or one specific command's info",
    category: "info",
    options: [
        {
            name: "command",
            description: "The command you want info on.",
            type: "STRING",
            required: false
        },
    ],
    run
}