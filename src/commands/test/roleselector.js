const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "roleselector",
    aliases: ["rs"],
    category: "test",
    permissions: -1,
    run: async ({client, message, args}) => {

        roles = message.mentions.roles

        if (!roles)
            return message.reply("No roles supplied.")

        let buttons = []

        roles.forEach(role => {
            buttons.push(new MessageButton().setCustomId(`role-${role.id}`).setStyle("PRIMARY").setLabel(role.name))
        })
        
        message.channel.send({
            embeds: [
                new MessageEmbed().setTitle("Select Role").setDescription("Select roles from the buttons below").setColor("BLUE")
            ],
            components: [
                new MessageActionRow().addComponents(buttons)
            ]
        })
    }
}