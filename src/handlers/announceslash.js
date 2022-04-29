module.exports = async (bot) => {
    const { client, slashguilds } = bot

    console.log(`Announcing ${client.slashcommands.size} slash commands`)
    slashguilds.forEach(slashguild => {
        console.log(`Loading guild [${slashguild}]`)
        const guild = client.guilds.cache.get(slashguild)
        if (!guild)
            console.error("Target Guild not found")
        console.log(guild.name)
        guild.commands.set([...client.slashcommands.values()])
    });
    console.log("Finished announcing slash command")        
}