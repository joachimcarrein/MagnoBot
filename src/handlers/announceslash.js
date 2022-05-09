module.exports = async (bot) => {
    const { client } = bot

    console.log(`Announcing ${client.slashcommands.size} slash commands`)
    client.guilds.cache.forEach(guild => {
        console.log(`*** Announcing in [${guild.id}]: [${guild.name}]`)
        guild.commands.set([...client.slashcommands.values()])
    });
    console.log("Finished announcing slash command")        
}