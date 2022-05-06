const { getPermissionLevel, getPermissionName } = require("../../handlers/permissions")

module.exports = {
    name: "permlevel",
    aliases: [],
    category: "server",
    description: "Show your permission level within this server",
    usage: "",
    run: async ({ client, message, args }) => {
        message.reply(`Your permission level is \`${getPermissionName(getPermissionLevel(message.member))}\``)
    }
}


