const ttt = require("../../buttons/ttt")

module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    category: "games",
    description: "Play tic tac toe.\n" +
        "Use parameter 2p for 2 player game. eg. !ttt 2p\n" +
        "Chance of bot start = 1/5.\n" +
        "Use parameter u for bot game, but certain user start. eg. !ttt u\n" +
        "Use parameter b for bot game, but certain bot start. eg. !ttt b\n" +
        "If bot starts, you probably gonna loose.",
    usage: "[2p | u | b]",
    run: async ({ client, message, args }) => {
        let target = "c"
        if (args[0] == "2p") target = "u"

        let game = "........." // 9 dots to represent playing field, . = empty, x = X, o = O
        let currTurn = "o" // easier than loads of checks for right print name
        let returnMsg = ttt.checkReturnMsg(game, currTurn, target, true) // first check seems like botCheck, just for initial turn print
        let components = ttt.buildComponents(game, currTurn, target)

        if (target == "c" && !(args[0] == "u")) {
            if ((Math.floor(Math.random() * 100) % 5 == 0) || (args[0] == 'b')) {
                currTurn = currTurn == 'x' ? 'o' : 'x'
                game = ttt.computerTurn(game, currTurn)
                returnMsg = ttt.checkReturnMsg(game, currTurn, target, true)
                components = ttt.buildComponents(game, currTurn, target)
            }
        }

        await message.reply({
            content: returnMsg,
            components: components
        })
    }
}