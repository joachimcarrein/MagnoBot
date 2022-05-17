const Discord = require("discord.js")
module.exports = {
    name: "server",
    category: "server",
    description: "Show server info",
    options: [
        {
            name: "choice",
            description: "Your selected choice.",
            type: "STRING",
            choices: [ 
                {
                    name: "members", 
                    value: "members"
                }, 
                {
                    name: "boosts", 
                    value:"boosts"
                }, 
                {
                    name: "joined", 
                    value:"joined"
                }
            ],
            required: false
        },
    ],
    run: async ({ client, interaction }) => {
        let choice = interaction.options.getString("choice")
        let serverEmbed = new Discord.MessageEmbed()
            .setColor("DARK_GOLD")

        switch (choice) {
            case 'members':
                const serverMembers = interaction.guild.memberCount;
                serverEmbed.setTitle(`${interaction.guild.name} has ${serverMembers} members.`)
                break;
            case 'boosts':
                const serverBoosts = interaction.guild.premiumSubscriptionCount
                serverEmbed.setTitle(`${interaction.guild.name} has ${serverBoosts} boosts of the server.`)
                break;
            case 'joined':
                serverEmbed.setTitle(`You joined ${interaction.guild.name} at ${interaction.member.joinedAt}.`)
                break;
            default:
                serverEmbed.setTitle(`Welcome to server ${interaction.guild.name}`)
                .setDescription('Use one of the following options for more info: members, boosts, joined.')
                break;
        }

        serverEmbed = client.functions.get("functions").setEmbedFooter(serverEmbed, client)

        interaction.reply({ embeds: [serverEmbed] })
    }
}


