module.exports = {
    name: "killbot",
    aliases: [],
    category: "hidden",
    permissions: -1,
    description: 'Kill bot process.',
    usage: "",
    run: async ({ client, message, args }) => {
        process.exit(-1)
    }
}