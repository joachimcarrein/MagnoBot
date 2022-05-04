module.exports = {
    name: "nuke",
    aliases: [],
    category: "channel",
    permissions: 10,
    run: async ({ client, message, args }) => {
        // default deletes message itself plus previous
        let reason = args.join(" ")
        if (!reason) reason = "no reason given"

        const nukeChannel = message.channel
        if (!nukeChannel.deletable) return message.reply("Cannot nuke channel.")

        await nukeChannel.clone().catch(error => console.log(error))
        await nukeChannel.delete(reason).catch(error => console.log(error))
    }
}