module.exports = {
    name: "emojify",
    aliases: [],
    category: "fun",
    description: "Renders your text to big emoji letters",
    usage: "<text>",
    run: async ({ client, message, args }) => {
        let reaction = args.join(" ")
        if (!reaction) return await message.reply("No text supplied")

        const mapping = {
            ' ': '   ',
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '!': ':grey_exclamation:',
            '?': ':grey_question:',
            '#': ':hash:',
            '*': ':asterisk:'
        };

        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
        });

        await message.delete()
        await message.channel.send(reaction.split("").map(c => mapping[c] || c).join(""))
    }
}