const RockPaperScissors = require("../../Classes/rockpaperscissors")

module.exports = {
    name: "rockpaperscissors",
    aliases: ["rps"],
    category: "games",
    description: "Play rock paper scissors agains bot",
    usage: "<rock | paper | scissors>",
    run: async ({ client, message, args }) => {        
        new RockPaperScissors().newGame(message,args[0])
    }
}