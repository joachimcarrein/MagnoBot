const { getFiles } = require("../functions/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
    const { client } = bot

    fs.readdirSync("./src/commands").forEach((category) => {
        let commands = getFiles(`./src/commands/${category}`, ".js")

        commands.forEach((f) => {
            if (reload)
                delete require.cache[require.resolve(`../commands/${category}/${f}`)]
            const command = require(`../commands/${category}/${f}`)
            client.commands.set(command.name, command)

            // If file has aliases and aliases are in an Array (List), register each alias in to the collection
            if (command.aliases)
                command.aliases.forEach((alias) => {
                    client.aliases.set(alias, command.name); //adds it to commands
                });
        })
    })

    console.log(`Loaded ${client.commands.size} commands`)
}