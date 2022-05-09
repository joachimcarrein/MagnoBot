const { getFiles } = require("../functions/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
	const { client } = bot

	fs.readdirSync("./src/slashcommands").forEach((category) => {
		let slashcommands = getFiles(`./src/slashcommands/${category}`, ".js")

		slashcommands.forEach((f) => {
			if (reload) delete require.cache[require.resolve(`../slashcommands/${category}/${f}`)]
			const slashcmd = require(`../slashcommands/${category}/${f}`)
			client.slashcommands.set(slashcmd.name, slashcmd)
		})
	})

    console.log(`Loaded ${client.slashcommands.size} slashcommands`)
}