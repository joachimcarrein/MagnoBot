const ttt = require("../../buttons/ttt")

module.exports = {
    name: "tictactoe",
    category: "games",
    description: "Play tic tac toe.",
    options: [
        {
            name: "options",
            description: "Game options",
            type: "STRING",
            choices: [
                {
                    name: "2 Players",
                    value: "2p"
                },
                {
                    name: "Bot Start",
                    value: "b"
                },
                {
                    name: "User Start",
                    value: "u"
                }
            ],
            required: false
        },
    ],
    run: async ({ client, interaction }) => {

        let options = interaction.options.getString("options")

        let target = "c"
        if (options == "2p") target = "u"

        let game = "........." // 9 dots to represent playing field, . = empty, x = X, o = O
        let currTurn = "o" // easier than loads of checks for right print name
        let returnMsg = ttt.checkReturnMsg(game, currTurn, target, true) // first check seems like botCheck, just for initial turn print
        let components = ttt.buildComponents(game, currTurn, target)

        if (target == "c" && !(options == "u")) {
            if ((Math.floor(Math.random() * 100) % 5 == 0) || (options == 'b')) {
                currTurn = currTurn == 'x' ? 'o' : 'x'
                game = ttt.computerTurn(game, currTurn)
                returnMsg = ttt.checkReturnMsg(game, currTurn, target, true)
                components = ttt.buildComponents(game, currTurn, target)
            }
        }

        await interaction.reply({
            content: returnMsg,
            components: components
        })
    }
}