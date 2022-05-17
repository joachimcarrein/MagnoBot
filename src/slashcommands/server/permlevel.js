const { getPermissionLevel, getPermissionName } = require("../../handlers/permissions")

module.exports = {
    name: "permlevel",
    category: "server",
    description: "Show your permission level within this server",
    run: async ({ interaction }) => {
        interaction.reply(`Your permission level is \`${getPermissionName(getPermissionLevel(interaction.member))}\``)
    }
}


