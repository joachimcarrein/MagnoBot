
class RockPaperScissors {

    constructor() {}

    newGame(message, userOption) {
        const options = ['rock', 'paper', 'scissors']
        const optionsImage = [':rock:', ':newspaper:', ':scissors:']
        if (!options.includes(userOption)) return message.reply(`You have to select one of the options: ${options}`)

        const botChoice = Math.floor(Math.random() * 3)
        let botChoiceString = options[botChoice]
        let userChoice = options.indexOf(userOption)
        let botEmoji = optionsImage[botChoice]
        let userEmoji = optionsImage[userChoice]

        let returnMessage = `You pick ${userOption} ${userEmoji}\nBot picked ${botChoiceString} ${botEmoji}`

        if (userChoice == botChoice) return message.reply(`${returnMessage}\n\nIt's a tie`)
        if (userChoice == 0) {
            if (botChoice == 1) return message.reply(`${returnMessage}\n\nBot wins!`)
            if (botChoice == 2) return message.reply(`${returnMessage}\n\nYou win!`)
        } else if (userChoice == 1) {
            if (botChoice == 2) return message.reply(`${returnMessage}\n\nBot wins!`)
            if (botChoice == 0) return message.reply(`${returnMessage}\n\nYou win!`)
        } else if (userChoice == 2) {
            if (botChoice == 0) return message.reply(`${returnMessage}\n\nBot wins!`)
            if (botChoice == 1) return message.reply(`${returnMessage}\n\nYou win!`)
        }
    }
}

module.exports = RockPaperScissors