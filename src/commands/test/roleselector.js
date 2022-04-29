const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")

module.exports = {
    name: "roleselector",
    category: "test",
    permissions: [],
    adminOnly: true,
    run: async ({client, message, args}) => {
        message.channel.send({
            embeds: [
                new MessageEmbed().setTitle("Select Role").setDescription("Select roles from the buttons below").setColor("BLUE")
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-969563700598042644").setStyle("PRIMARY").setLabel("test")  // test role
                ])
            ]
        })
    }
}