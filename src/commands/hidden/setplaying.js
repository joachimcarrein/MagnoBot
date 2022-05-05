module.exports = {
    name: "setplaying",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Set the bot "IsPlaying" status',
    usage: "[status]",
    run: async ({ client, message, args }) => {
        client.user.setPresence({ activities: [{ name: args.join(" ") }] });
    }
}