const { delay } = require("../../util/functions")

module.exports = {
    name: "clear",
    category: "channelMgmt",
    permissions: ["MANAGE_MESSAGES"],
    adminOnly: false,
    run: async ({ client, message, args }) => {
        // default deletes message itself plus previous
        let num = 2;

        //if argument is provided, we need to convert it from string to number
        if (args[0]) {
            //add 1 to delete clear command itself
            num = parseInt(args[0]) + 1;
        }

        //bulk delete the messages
        message.channel.bulkDelete(num);

        //notify channel of deleted messages
        let newmsg = await message.channel.send(`Deleted ${num - 1} posts.\nThis message will be removed in 5 seconds.`);

        await delay(5000)
        newmsg.delete()
    }
}