const fs = require("fs")
const readLastLines = require('read-last-lines');

module.exports = {
    name: "showconsole",
    category: "logs",
    cmdpermissions: -1,
    description: 'Get the console logs',
    usage: "[Quantity]",
    run: async ({message, args}) => {
        let number = args[0]
        if (!number) number = 15

        const path = './src/daemon/trace.out.log'
        if (fs.existsSync(path)) {
            let console = await readLastLines.read(path, number)
            await message.reply({
                content: `**Last __*${number}*__ Console Lines:**\n\`\`\`` + console + " \`\`\`"
            })
        }
    }
}