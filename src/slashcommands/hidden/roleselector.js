const { MessageActionRow, MessageButton, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "roleselector",
    category: "hidden",
    permissions: -1,
    description: 'test for roleselector buttons (up to 5)',
    options: [
        {
            name: "role1",
            description: "Button roles",
            type: ApplicationCommandOptionType.Role,
            required: true
        },
        {
            name: "role2",
            description: "Button roles",
            type: ApplicationCommandOptionType.Role,
            required: false
        },
        {
            name: "role3",
            description: "Button roles",
            type: ApplicationCommandOptionType.Role,
            required: false
        },
        {
            name: "role4",
            description: "Button roles",
            type: ApplicationCommandOptionType.Role,
            required: false
        },
        {
            name: "role5",
            description: "Button roles",
            type: ApplicationCommandOptionType.Role,
            required: false
        },
    ],
    run: async ({ interaction }) => {
        let roles = []

        roles = addRole(roles, interaction, "role1")
        roles = addRole(roles, interaction, "role2")
        roles = addRole(roles, interaction, "role3")
        roles = addRole(roles, interaction, "role4")
        roles = addRole(roles, interaction, "role5")

        let buttons = []

        roles.forEach(role => {
            buttons.push(new MessageButton().setCustomId(`role-${role.id}`).setStyle("PRIMARY").setLabel(role.name))
        })

        await interaction.reply({
            embeds: [
                new EmbedBuilder().setTitle("Select Role").setDescription("Select roles from the buttons below").setColor(Discord.Colors.Blue)
            ],
            components: [
                new MessageActionRow().addComponents(buttons)
            ]
        })
    }
}

function addRole(roles, interaction, name) {
    let role = interaction.options.getRole(name)
    if (!!role) roles.push(role)
    return roles
}