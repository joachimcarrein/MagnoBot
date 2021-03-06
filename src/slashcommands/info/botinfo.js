const pjson = require("../../../package.json");
const Discord = require("discord.js")
const os = require("os")

module.exports = {
    name: "botinfo",
    category: "info",
    description: 'Displays bot info',
    run: async ({ client, interaction }) => {
        const botMember = await interaction.guild.members.fetch(client.user.id)
        let botembed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL)
            .setTitle("About this bot:")
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setDescription("Simple bot by MagnoBE")
            .setColor("#800080")
            .addField("Bot name:", client.user.username, true)
            .addField("Version:", `${pjson.version} ${pjson.codeName}`, true)
            .addField("Created by:", "MagnoBE", true)
            .addField("Created on", `${client.user.createdAt}`, true)            
            .addField("On the server since:", `${botMember.joinedAt}`, true)
            .addField("Guilds Using this bot: ", `\`${client.guilds.cache.size}\``, true)
            .addField("Server: ", `\`${os.hostname()}\``, true)
            .addField("Uptime: ", client.functions.get("functions").formatTime(client.uptime), true)

        botembed = client.functions.get("functions").setEmbedFooter(botembed, client)

        return await interaction.reply({ embeds: [botembed] });
    }
}