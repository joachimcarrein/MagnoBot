const ttt = require("../../buttons/ttt")

module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    category: "fun",
    description: "Play tic tac toe. Use parameter p for 2 player game.\nChance of bot start = 1/5.\nIf bot starts, you probably gonna loose.",
    permissions: 2,
    run: async ({ client, message, args }) => {
        let target = "c"
        if (["p","player","u","user", '2p'].includes(args[0])) target = "u"        

        let game = "........." // 9 dots to represent playing field, . = empty, x = X, o = O
        let currTurn = "o" // easier than loads of checks for right print name
        let returnMsg = ttt.checkReturnMsg(game, currTurn, target, true) // first check seems like botCheck, just for initial turn print
        let components = ttt.buildComponents(game, currTurn, target)        

        if (target == "c") {
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