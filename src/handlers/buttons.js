const fs = require("fs")
const { getFiles } = require("../functions/functions")

module.exports = (bot, reload) => {
    const { client } = bot

    let buttons = getFiles("./src/buttons", ".js")

    if (buttons.length === 0) {
        console.log("No buttons")
    }

    buttons.forEach((f) => {
        if (reload)
            delete require.cache[require.resolve(`../buttons/${f}`)]
        const button = require(`../buttons/${f}`)

        client.buttons.set(button.name, button)
    })

    console.log(`Loaded ${client.buttons.size} buttons`)
}