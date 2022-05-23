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
            required: false
        },
    ],
    run: async ({ client, interaction }) => {
        let target = interaction.options.getInteger('number')
        // default deletes previous message / command itself gives no message
        let num = 1;

        //if argument is provided, we need to convert it from string to number
        if (!!target) {
            num = target
        }

        todo = num

        while (todo > 100) {
            interaction.channel.bulkDelete(100);
            await client.functions.get("functions").delay(500)
            todo -= 100
        }

        //bulk delete the messages
        interaction.channel.bulkDelete(todo);

        //notify channel of deleted messages
        await interaction.reply({ content: `Deleted ${num} posts.\nThis message will self-destruct in 5 seconds.`, fetchReply: true });
        await client.functions.get("functions").delay(5000)
        try {
            await interaction.deleteReply()  
        } catch (error) {
            console.log("Message already gone probably")
        }  
    }
}