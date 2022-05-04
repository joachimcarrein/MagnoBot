const ttt = require("../../buttons/ttt")

module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    category: "fun",
    description: "Play tic tac toe.\n" + 
                 "Use parameter p for 2 player game. eg. !ttt p\n" + 
                 "Chance of bot start = 1/5.\n" + 
                 "Use parameter u for bot game, but certain user start. eg. !ttt u\n" +
                 "If bot starts, you probably gonna loose.",
    permissions: 2,
    run: async ({ client, message, args }) => {
        let target = "c"
        if (args[0] == "p") target = "u"        

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