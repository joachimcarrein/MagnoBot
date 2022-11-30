const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "clear",
    aliases: ["c"],
    category: "channel",
    permissions: 20,
    description: "Clears a number of message in the channel",
    default_member_permissions: PermissionFlagsBits.ManageChannels,
    options: [
        {
            name: "number",
            description: "The number of messages you want cleared",
            type: ApplicationCommandOptionType.Integer,
            minValue: 1,
            required: false
        },
    ],
    run: async ({ client, interaction }) => {
        let target = interaction.options.getInteger('number')

        await interaction.deferReply()

        // default deletes previous message / command itself gives no message
        let num = 1;

        //if argument is provided, we need to convert it from string to number
        if (!!target) {
            num = target
        }

        todo = num

        while (todo > 100) {
            await interaction.channel.bulkDelete(100);
            await client.functions.get("functions").delay(500)
            todo -= 100
        }
        await interaction.channel.bulkDelete(todo);

        //notify channel of deleted messages
        msg = await interaction.channel.send(`Deleted ${num} posts.\nThis message will self-destruct in 5 seconds.`);
        await client.functions.get("functions").delay(5000)
        try {
            await msg.delete();
        } catch (error) {
            console.log("Message already gone probably")
        }
    }
}