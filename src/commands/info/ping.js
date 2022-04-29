module.exports = {
    name: "ping",
    aliases: [],
    category: "info",
    permissions: 2,
    run: async ({ client, message, args }) => {
        const msg = await message.channel.send(`Main bot Pinging...`);
        msg.edit(`Pong! \nAPI: \`${Math.round(client.ws.ping)}\`ms\nBot: \`${msg.createdAt - message.createdAt}\`ms.\nUptime: ${client.functions.get("functions").formatTime(client.uptime)}`);
    }
}