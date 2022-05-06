module.exports = {
    name: "killbot",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Kill bot process.',
    usage: "",
    run: async ({ client, message, args }) => {
        await message.reply("Killing bot process. No recovery from this... 😵🪦")
        process.exit(-1)
        await message.reply("Something went wrong, bot still here...")
    }
}