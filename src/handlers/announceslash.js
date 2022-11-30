const _ = require("lodash")

module.exports = async (bot, guildID, forceGlobal) => {
    const { client } = bot

    console.log(`Announcing ${client.slashcommands.size} slash commands`)
    if (client.slashcommands.size === 0) return
    await client.guilds.cache.forEach(async guild => {
        if (!guildID || guild.id === guildID) {
            console.log(`*** Announcing in [${guild.id}]: [${guild.name}]`)

            let toAnnounce = _.cloneDeep(client.slashcommands.filter(sc => !sc.guilds || sc.guilds.includes(guild.id)))
            toAnnounce = toAnnounce.filter(sc => !sc.global)
            guild.commands.set([...toAnnounce.values()])
        }
    });

    if (forceGlobal) {
        let toAnnounce = client.slashcommands.filter(sc => !!sc.global)
        const { Routes } = require('discord.js');
        const { addLog } = require('../functions/logs')
        if (toAnnounce.size !== 0) {

            client.rest.put(Routes.applicationCommands(client.user.id), { body: [...toAnnounce.values()] })
                .then((data) => console.log(`Successfully registered ${data.length} global application commands.`))
                .catch((err) => addLog(null, err, err.stack));

        }
    }
    console.log("Finished announcing slash command")
}