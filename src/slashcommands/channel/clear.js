module.exports = {
    name: "clear",
    aliases: ["c"],
    category: "channel",
    permissions: 20,
    description: "Clears a number of message in the channel",
    options: [
        {
            name: "number",
            description: "The number of messages you want cleared",
            type: "INTEGER",
            minValue: 1,
            maxValue: 100,
            required: false
        },
    ],
    run: async ({ interaction, args }) => {
        let target = interaction.options.getInteger('number')
        // default deletes previous message / command itself gives no message
        let num = 1;

        //if argument is provided, we need to convert it from string to number
        if (!!target) {
            num = target
        }

        if (num > 100) num = 100

        //bulk delete the messages
        interaction.channel.bulkDelete(num);

        //notify channel of deleted messages
        await interaction.reply({ content: `Deleted ${num} posts.`, ephemeral: true });
    }
}