const { MessageActionRow, MessageButton } = require("discord.js")

function getEmoji(ch) {
    const blankTile = '⬛' // ⬛ 🟦
    const xTile = '❌'
    const oTile = '⭕'

    switch (ch) {
        case 'x':
            return xTile;
        case 'o':
            return oTile;
        default:
            return blankTile;
    }
}

function checkReturnMsg(game, currTurn, target, botCheck) {

    let xMsg = 'X'
    let oMsg = 'O'
    if (target == 'c') {
        if ((currTurn == 'x' && botCheck) || (currTurn == 'o' && !botCheck)) {
            xMsg = 'Bot'
            oMsg = 'User'
        } else {
            xMsg = 'User'
            oMsg = 'Bot'
        }
    }

    let topRow = new Set([game[0], game[1], game[2]]) // Top Row                              
    let midRow = new Set([game[3], game[4], game[5]]) // Middle Row
    let bottomRow = new Set([game[6], game[7], game[8]]) // Bottom Row

    let leftCol = new Set([game[0], game[3], game[6]]) // Left Column
    let midCol = new Set([game[1], game[4], game[7]]) // Middle Column
    let rightCol = new Set([game[2], game[5], game[8]]) // Right Column

    let diagTopLeft = new Set([game[0], game[4], game[8]]) // Diagonally Top Left => Bottom Right
    let diagTopRight = new Set([game[2], game[4], game[6]]) // Diagonally Top Right => Bottom Left   

    if (topRow.size === 1 && topRow.has("x")) return `${xMsg} wins!`
    if (topRow.size === 1 && topRow.has("o")) return `${oMsg} wins!`

    if (midRow.size === 1 && midRow.has("x")) return `${xMsg} wins!`
    if (midRow.size === 1 && midRow.has("o")) return `${oMsg} wins!`

    if (bottomRow.size === 1 && bottomRow.has("x")) return `${xMsg} wins!`
    if (bottomRow.size === 1 && bottomRow.has("o")) return `${oMsg} wins!`

    if (leftCol.size === 1 && leftCol.has("x")) return `${xMsg} wins!`
    if (leftCol.size === 1 && leftCol.has("o")) return `${oMsg} wins!`

    if (midCol.size === 1 && midCol.has("x")) return `${xMsg} wins!`
    if (midCol.size === 1 && midCol.has("o")) return `${oMsg} wins!`

    if (rightCol.size === 1 && rightCol.has("x")) return `${xMsg} wins!`
    if (rightCol.size === 1 && rightCol.has("o")) return `${oMsg} wins!`

    if (diagTopLeft.size === 1 && diagTopLeft.has("x")) return `${xMsg} wins!`
    if (diagTopLeft.size === 1 && diagTopLeft.has("o")) return `${oMsg} wins!`

    if (diagTopRight.size === 1 && diagTopRight.has("x")) return `${xMsg} wins!`
    if (diagTopRight.size === 1 && diagTopRight.has("o")) return `${oMsg} wins!`

    if (!game.includes(".")) return "Tie. Nobody wins!"

    if (currTurn == 'x') {
        return `${oMsg}'s Turn`
    } else {
        return `${xMsg}'s Turn`
    }
}

function buildComponents(game, currTurn, target) {
    nextTurn = currTurn == 'x' ? 'o' : 'x'
    const row1 = new MessageActionRow().addComponents([
        new MessageButton().setCustomId(`ttt-1-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[0])).setStyle('PRIMARY'),
        new MessageButton().setCustomId(`ttt-2-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[1])).setStyle('PRIMARY'),
        new MessageButton().setCustomId(`ttt-3-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[2])).setStyle('PRIMARY'),
    ]);

    const row2 = new MessageActionRow().addComponents([
        new MessageButton().setCustomId(`ttt-4-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[3])).setStyle('PRIMARY'),
        new MessageButton().setCustomId(`ttt-5-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[4])).setStyle('PRIMARY'),
        new MessageButton().setCustomId(`ttt-6-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[5])).setStyle('PRIMARY'),
    ]);

    const row3 = new MessageActionRow().addComponents([
        new MessageButton().setCustomId(`ttt-7-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[6])).setStyle('PRIMARY'),
        new MessageButton().setCustomId(`ttt-8-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[7])).setStyle('PRIMARY'),
        new MessageButton().setCustomId(`ttt-9-${nextTurn}-${game}-${target}`).setEmoji(getEmoji(game[8])).setStyle('PRIMARY'),
    ]);

    return [row1, row2, row3]
}

function checkMove(game, turn, free) {
    // Rows
    if (game[0] == turn && game[1] == turn && game[2] == free) return 2 // top row xx.
    if (game[0] == turn && game[1] == free && game[2] == turn) return 1 // top row x.x
    if (game[0] == free && game[1] == turn && game[2] == turn) return 0 // top row .xx

    if (game[3] == turn && game[4] == turn && game[5] == free) return 5 // mid row xx.
    if (game[3] == turn && game[4] == free && game[5] == turn) return 4 // mid row x.x
    if (game[3] == free && game[4] == turn && game[5] == turn) return 3 // mid row .xx

    if (game[6] == turn && game[7] == turn && game[8] == free) return 8 // bottom row xx.
    if (game[6] == turn && game[7] == free && game[8] == turn) return 7 // bottom row x.x
    if (game[6] == free && game[7] == turn && game[8] == turn) return 6 // bottom row .xx

    // Columns
    if (game[0] == turn && game[3] == turn && game[6] == free) return 6 // top col xx.
    if (game[0] == turn && game[3] == free && game[6] == turn) return 3 // top col x.x
    if (game[0] == free && game[3] == turn && game[6] == turn) return 0 // top col .xx

    if (game[1] == turn && game[4] == turn && game[7] == free) return 7 // mid col xx.
    if (game[1] == turn && game[4] == free && game[7] == turn) return 4 // mid col x.x
    if (game[1] == free && game[4] == turn && game[7] == turn) return 1 // mid col .xx

    if (game[2] == turn && game[5] == turn && game[8] == free) return 8 // bottom col xx.
    if (game[2] == turn && game[5] == free && game[8] == turn) return 5 // bottom col x.x
    if (game[2] == free && game[5] == turn && game[8] == turn) return 2 // bottom col .xx

    // Diagonally
    if (game[0] == turn && game[4] == turn && game[8] == free) return 8 // Diagonally \ xx.
    if (game[0] == turn && game[4] == free && game[8] == turn) return 4 // Diagonally \ x.x
    if (game[0] == free && game[4] == turn && game[8] == turn) return 0 // Diagonally \ .xx

    if (game[2] == turn && game[4] == turn && game[6] == free) return 6 // Diagonally / xx.
    if (game[2] == turn && game[4] == free && game[6] == turn) return 4 // Diagonally / x.x
    if (game[2] == free && game[4] == turn && game[6] == turn) return 2 // Diagonally / .xx

    return
}

function cornerStrat(game, myToken, free) {
    const b = myToken
    const f = free
    const checkArr = [b, f]

    if (game[0] == b && game[8] == b && (checkArr.includes(game[3] || checkArr.includes(game[7])))) return 6
    if (game[0] == b && game[8] == b && (checkArr.includes(game[1] || checkArr.includes(game[5])))) return 2

    if (game[2] == b && game[6] == b && (checkArr.includes(game[5] || checkArr.includes(game[7])))) return 8
    if (game[2] == b && game[6] == b && (checkArr.includes(game[1] || checkArr.includes(game[3])))) return 0

    // take corners if mid is free
    if (game[0] == f && checkArr.includes(game[8])) return 0
    if (game[0] == b && game[8] == f) return 8
    if (game[2] == f && checkArr.includes(game[6])) return 2
    if (game[2] == b && game[6] == f) return 6

    return
}

function computerTurn(game, currTurn) {
    b = currTurn                    // bot char
    u = currTurn == 'x' ? 'o' : 'x' // usr char
    f = "."                         // blank space

    let move = checkMove(game, b, f) // check bot instant wins
    if (move === undefined) move = checkMove(game, u, f) // check user win blocks
    if (move === undefined) move = cornerStrat(game, b, f) // corner strategy

    // find random free
    while (move === undefined) {
        let rnd = Math.floor(Math.random() * 9)
        if (game[rnd] == f) move = rnd
    }

    str = game.split("")
    str[move] = b
    game = str.join("")
    return game
}

function gameOverview(game) {
    return '\n\n' +
        `${getEmoji(game[0])}${getEmoji(game[1])}${getEmoji(game[2])}\n` +
        `${getEmoji(game[3])}${getEmoji(game[4])}${getEmoji(game[5])}\n` +
        `${getEmoji(game[6])}${getEmoji(game[7])}${getEmoji(game[8])}\n`
}

module.exports = {
    name: "ttt",
    run: async (client, interaction, parameters) => {
        const currPosition = parameters[0]
        let currTurn = parameters[1]
        let game = parameters[2]
        let target = parameters[3]
        if (!["u", "c"].includes(target)) target = "u"

        let gameArr = game.split("")
        if (gameArr[currPosition - 1] === ".") {
            gameArr[currPosition - 1] = currTurn
        } else { return }
        game = gameArr.join("")

        let returnMsg = checkReturnMsg(game, currTurn, target, false)
        let components = buildComponents(game, currTurn, target)

        if (returnMsg.includes('wins')) {
            components = []
            returnMsg += gameOverview(game)
        } else {
            if (target === "c") {
                currTurn = currTurn == 'x' ? 'o' : 'x'
                game = computerTurn(game, currTurn)
                returnMsg = checkReturnMsg(game, currTurn, target, true)
                components = buildComponents(game, currTurn, target)
                if (returnMsg.includes('wins')) {
                    components = []
                    returnMsg += gameOverview(game)
                }
            }
        }
        await interaction.update({
            content: returnMsg,
            components: components
        });
    },
    buildComponents,
    checkReturnMsg,
    computerTurn
}