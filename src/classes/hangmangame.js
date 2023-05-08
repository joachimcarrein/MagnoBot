const Discord = require("discord.js")

const letterEmojisMap = {
    "🅰️": "A", "🇦": "A", "🅱️": "B", "🇧": "B", "🇨": "C", "🇩": "D", "🇪": "E",
    "🇫": "F", "🇬": "G", "🇭": "H", "ℹ️": "I", "🇮": "I", "🇯": "J", "🇰": "K", "🇱": "L",
    "Ⓜ️": "M", "🇲": "M", "🇳": "N", "🅾️": "O", "⭕": "O", "🇴": "O", "🅿️": "P",
    "🇵": "P", "🇶": "Q", "🇷": "R", "🇸": "S", "🇹": "T", "🇺": "U", "🇻": "V", "✅": "V", "🇼": "W",
    "✖️": "X", "❎": "X", "❌": "X", "🇽": "X", "🇾": "Y", "💤": "Z", "🇿": "Z"
}

class HangManGame {
    constructor() {
        this.word = "";
        this.guessed = []
        this.wrongs = 0
        this.gameEmbed = null
        this.client = null
        this.inGame = false
        this.debug = false
    }

    newGame(newWord, message, client, debug) {
        if (this.inGame) return

        this.word = newWord
        this.client = client
        this.inGame = true
        this.guessed = []
        this.wrongs = 0
        this.debug = debug

        let embed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setAuthor({ name: "Hangman game", iconURL: "https://imgur.com/0guxxtY.png" })
            .setDescription(this.getDescription())
            .addFields({ name: 'Wrong Guesses', value: `${this.wrongs} / 6` })
            .addFields({ name: 'How To Play', value: "React to this message using the emojis that look like letters (🅰️, 🇹, ❌, 💤, ...)" })

        if (this.debug)
            embed.addFields({ name: "Debug", value: "word is " + this.word })

        embed = this.client.functions.get("functions").setEmbedFooter(embed, this.client)

        message.channel.send({ embeds: [embed] }).then(emsg => {
            this.gameEmbed = emsg
            this.waitForReaction()
        })
    }

    waitForReaction() {
        this.gameEmbed.awaitReactions({ filter: () => true, time: 300000, max: 1, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                this.makeGuess(reaction.emoji?.name);
                reaction.remove();
            })
            .catch(collected => {
                this.gameOver(false)
            })
    }

    makeGuess(reaction) {
        if (Object.keys(letterEmojisMap).includes(reaction)) {
            const letter = letterEmojisMap[reaction];
            if (!this.guessed.includes(letter)) {
                this.guessed.push(letter);

                if (this.word.indexOf(letter.toLowerCase()) == -1) {
                    this.wrongs++;

                    if (this.wrongs == 6) {
                        this.gameOver(false);
                    }
                }
                else if (!this.word.split("").map(l => this.guessed.includes(l.toUpperCase()) ? l : "_").includes("_")) {
                    this.gameOver(true);
                }
            }
        }

        if (this.inGame) {

            let embed = new Discord.EmbedBuilder()
                .setColor(Discord.Colors.Blue)
                .setAuthor({ name: "Hangman game", iconURL: "https://imgur.com/0guxxtY.png" })
                .setDescription(this.getDescription())
                .addFields({ name: 'Letters Guessed', value: this.guessed.length == 0 ? '\u200b' : this.guessed.join(" ") })
                .addFields({ name: 'Wrong Guesses', value: `${this.wrongs} / 6` })
                .addFields({ name: 'How To Play', value: "React to this message using the emojis that look like letters (🅰️, 🇹, ❌, 💤, ...)" })

            if (this.debug)
                embed.addFields({ name: "Debug", value: "word is " + this.word })

            embed = this.client.functions.get("functions").setEmbedFooter(embed, this.client)

            this.gameEmbed.edit({ embeds: [embed] })
            this.waitForReaction();
        }
    }

    gameOver(win) {

        this.inGame = false

        let embed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setAuthor({ name: "Hangman game", iconURL: "https://imgur.com/0guxxtY.png" })
            .setDescription((win ? "**Chat Wins!**" : "**Chat losses**"))
            .addFields({ name: 'Word was', value: this.word })
            .addFields({ name: 'Wrong Guesses', value: `${this.wrongs} / 6` })

        embed = this.client.functions.get("functions").setEmbedFooter(embed, this.client)

        this.gameEmbed.edit({ embeds: [embed] });

        this.gameEmbed.reactions.removeAll();
    }

    getDescription() {
        let returnMsg = "```"
            + "|‾‾‾‾‾‾|   \n|     "
            + (this.wrongs > 0 ? "🎩" : " ")
            + "   \n|     "
            + (this.wrongs > 1 ? "😟" : " ")
            + "   \n|     "
            + (this.wrongs > 2 ? "👕" : " ")
            + "   \n|     "
            + (this.wrongs > 3 ? "👖" : " ")
            + "   \n|    "
            + (this.wrongs > 4 ? "👞👞" : " ")
            + "   \n|     \n|__________\n\n"
            + this.word.split("").map(l => this.guessed.includes(l.toUpperCase()) ? l : "_").join(" ")
            + "```"

        return returnMsg
    }
}

module.exports = HangManGame