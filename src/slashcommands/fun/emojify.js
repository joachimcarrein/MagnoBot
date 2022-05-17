module.exports = {
    name: "emojify",
    aliases: [],
    category: "fun",
    description: "Renders your text to big emoji letters",
    options: [
        {
            name: "text",
            description: "The text you want emojified",
            type: "STRING",
            required: true
        },
    ],
    run: async ({ interaction, args }) => {
        let reaction = interaction.options.getString("text")
        if (!reaction) return await interaction.reply("No text supplied")

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

        await interaction.reply(reaction.split("").map(c => mapping[c] || c).join(""))
    }
}