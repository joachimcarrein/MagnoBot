const { getPermissionLevel, getPermissionName } = require("../../handlers/permissions")

module.exports = {
    name: "permlevel",
    category: "server",
    description: "Show your permission level within this server",
    options: [
        {
            name: "user",
            description: "The user you want the level of.",
            type: "USER",
            required: false
        },
    ],
    run: async ({ interaction }) => {
        let target = interaction.options.getMember('user')
        if (!target) {
            target = interaction.member
        }
        await interaction.reply(`\`${target.user.username}\` is \`${getPermissionName(getPermissionLevel(target))}\``)
    }
}


