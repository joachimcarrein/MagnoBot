const fs = require("fs")
const { getFiles } = require("../util/functions")

module.exports = (bot, reload) => {
    const { client } = bot

    let slashcommands = getFiles("./src/slashcommands", ".js")

    if (slashcommands.length === 0) {
        console.log("No slashcommands")
    }

    slashcommands.forEach((f) => {
        if (reload)
            delete require.cache[require.resolve(`../slashcommands/${f}`)]
        const slashcommand = require(`../slashcommands/${f}`)
        
        client.slashcommands.set(slashcommand.name, slashcommand)
    })

    console.log(`Loaded ${client.slashcommands.size} slashcommands`)
}