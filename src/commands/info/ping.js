module.exports = {
    name: "ping",
    aliases: [],
    category: "info",
    description: 'Simple ping with timings',
    usage: "",
    run: async ({ client, message, args }) => {
        const msg = await message.channel.send(`:ping_pong: Main bot Pinging...`);
        msg.edit(`:ping_pong: Pong! \n` + 
                 `API: \`${Math.round(client.ws.ping)}\`ms\n` + 
                 `Bot: \`${msg.createdAt - message.createdAt}\`ms.\n` + 
                 `Uptime: ${client.functions.get("functions").formatTime(client.uptime)}`);
    }
}