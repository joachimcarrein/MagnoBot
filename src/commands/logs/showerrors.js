const fs = require("fs")
const readLastLines = require('read-last-lines');

module.exports = {
    name: "showerrors",
    category: "logs",
    cmdpermissions: -1,
    description: 'Get the error logs',
    usage: "[Quantity]",
    run: async ({message, args}) => {
        let number = args[0]
        if (!number) number = 15

        const path = './src/daemon/magnobot.err.log'
        if (fs.existsSync(path)) {
            let console = await readLastLines.read(path, number)
            await message.reply({
                content: `**Last __*${number}*__ Error Lines:**\n\`\`\`` + console + " \`\`\`"
            })
        }
    }
}