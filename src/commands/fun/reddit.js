const superagent = require("superagent");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "reddit",
    aliases: [],
    category: "fun",
    description: "Send an image of a sub reddit",
    usage: "<subreddit>",
    run: async ({ client, message, args }) => {
        const subReddit = args.join(" ")
        if (!subReddit) return await message.channel.send("No subreddit supplied.")
        const { body } = await superagent
            .get(`https://www.reddit.com/r/${args}.json?sort=top&t=week`)
            .query({ limit: 800 });

        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.reply("We are running out of dank meme. 😂😂😂");
        const randomNumber = Math.floor(Math.random() * allowed.length);
        const img = allowed[randomNumber].data.url
        const embed = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle(allowed[randomNumber].data.title)
            .setDescription(allowed[randomNumber].data.author)
            .setImage(img)
            .addField("Information: ", "Up vote:" + allowed[randomNumber].data.ups + " / Comment: " + allowed[randomNumber].data.num_comments)
            .setURL("https://reddit.com" + allowed[randomNumber].data.permalink)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
        return message.channel.send({ embeds: [embed] });
    }
}
