const RockPaperScissors = require("../../Classes/rockpaperscissors")

module.exports = {
    name: "rockpaperscissors",
    category: "games",
    description: "Play Rock Paper Scissors against the bot",
    options: [
        {
            name: "choice",
            description: "Your selected choice.",
            type: "STRING",
            choices: [ 
                {
                    name: "rock", 
                    value: "rock"
                }, 
                {
                    name: "paper", 
                    value:"paper"
                }, 
                {
                    name: "scissors", 
                    value:"scissors"
                }
            ],
            required: true
        },
    ],
    run: async ({client, interaction}) => {
        let choice = interaction.options.getString("choice")
        new RockPaperScissors().newGame(interaction, choice)
    }
}