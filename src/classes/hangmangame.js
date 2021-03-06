const Discord = require("discord.js")

const letterEmojisMap = {
    "đ°ī¸": "A", "đĻ": "A", "đąī¸": "B", "đ§": "B", "đ¨": "C", "đŠ": "D", "đĒ": "E",
    "đĢ": "F", "đŦ": "G", "đ­": "H", "âšī¸": "I", "đŽ": "I", "đ¯": "J", "đ°": "K", "đą": "L",
    "âī¸": "M", "đ˛": "M", "đŗ": "N", "đžī¸": "O", "â­": "O", "đ´": "O", "đŋī¸": "P",
    "đĩ": "P", "đļ": "Q", "đˇ": "R", "đ¸": "S", "đš": "T", "đē": "U", "đģ": "V", "â": "V", "đŧ": "W",
    "âī¸": "X", "â": "X", "â": "X", "đŊ": "X", "đž": "Y", "đ¤": "Z", "đŋ": "Z"
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

        let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor({ name: "Hangman game", iconURL: "https://imgur.com/0guxxtY.png" })
            .setDescription(this.getDescription())
            .addField('Wrong Guesses', `${this.wrongs} / 6`)
            .addField('How To Play', "React to this message using the emojis that look like letters (đ°ī¸, đš, â, đ¤, ...)")

        if (this.debug)
            embed.addField("Debug", "word is " + this.word)

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

            let embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setAuthor({ name: "Hangman game", iconURL: "https://imgur.com/0guxxtY.png" })
                .setDescription(this.getDescription())
                .addField('Letters Guessed', this.guessed.length == 0 ? '\u200b' : this.guessed.join(" "))
                .addField('Wrong Guesses', `${this.wrongs} / 6`)
                .addField('How To Play', "React to this message using the emojis that look like letters (đ°ī¸, đš, â, đ¤, ...)")

            if (this.debug)
                embed.addField("Debug", "word is " + this.word)

            embed = this.client.functions.get("functions").setEmbedFooter(embed, this.client)

            this.gameEmbed.edit({ embeds: [embed] })
            this.waitForReaction();
        }
    }

    gameOver(win) {

        this.inGame = false

        let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor({ name: "Hangman game", iconURL: "https://imgur.com/0guxxtY.png" })
            .setDescription((win ? "**Chat Wins!**" : "**Chat losses**"))
            .addField('Word was', this.word)
            .addField('Wrong Guesses', `${this.wrongs} / 6`)

        embed = this.client.functions.get("functions").setEmbedFooter(embed, this.client)

        this.gameEmbed.edit({ embeds: [embed] });

        this.gameEmbed.reactions.removeAll();
    }

    getDescription() {
        let returnMsg = "```"
            + "|âžâžâžâžâžâž|   \n|     "
            + (this.wrongs > 0 ? "đŠ" : " ")
            + "   \n|     "
            + (this.wrongs > 1 ? "đ" : " ")
            + "   \n|     "
            + (this.wrongs > 2 ? "đ" : " ")
            + "   \n|     "
            + (this.wrongs > 3 ? "đ" : " ")
            + "   \n|    "
            + (this.wrongs > 4 ? "đđ" : " ")
            + "   \n|     \n|__________\n\n"
            + this.word.split("").map(l => this.guessed.includes(l.toUpperCase()) ? l : "_").join(" ")
            + "```"

        return returnMsg
    }
}

module.exports = HangManGame