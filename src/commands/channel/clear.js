module.exports = {
    name: "clear",
    aliases: ["c"],
    category: "channel",
    permissions: 20,
    description: "Clears a number of message in the channel",
    usage: "[number]",
    run: async ({ client, message, args }) => {
        // default deletes message itself plus previous
        let num = 2;

        //if argument is provided, we need to convert it from string to number
        if (args[0]) {
            //add 1 to delete clear command itself
            num = parseInt(args[0]) + 1;
        }

        if (num > 100) num = 100

        //bulk delete the messages
        message.channel.bulkDelete(num);

        //notify channel of deleted messages
        let newmsg = await message.channel.send(`Deleted ${num - 1} posts.\nThis message will be removed in 5 seconds.`);

        await client.functions.get("functions").delay(5000)
        try {
            await newmsg.delete()   
        } catch (error) {
            console.log("Message already gone probably")
        }        
    }
}