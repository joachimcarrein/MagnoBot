const superagent = require("superagent");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "reddit",
    category: "fun",
    description: "Send an image of a sub reddit",
    options: [
        {
            name: "subreddit",
            description: "The subreddit you want an image of.",
            type: "STRING",
            required: true
        },
    ],
    run: async ({ client, interaction }) => {

        // const img = await fetchRedGifUrl(client, "https://www.redgifs.com/watch/someurl") // return direct url
        const subReddit = interaction.options.getString("subreddit")
        
        try {
            const { body } = await superagent
                .get(`https://www.reddit.com/r/${subReddit}.json?sort=top&t=week`)
                .query({ limit: 800 });

            const allowedTypes = ["gif", "gifv", "png", "jpg", "jpeg", "webm", "mp4", "webp", ".svg"]

            function endsWithAny(suffixes, string, string2) {
                searchString = string2 || string
                for (let suffix of suffixes) {
                    if (string.endsWith(suffix))
                        return true;
                }
                return false;
            }

            let allowed = interaction.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            allowed = allowed.filter(post => endsWithAny(allowedTypes, post.data.url, post.data.url_overridden_by_dest))

            let returnMsg = "No posts found with supported image types."
            if (!interaction.channel.nsfw) returnMsg += " Or which are not NSFW."
            if (!allowed.length) return interaction.reply(returnMsg);
            const randomNumber = Math.floor(Math.random() * allowed.length);
            const chosenOption = allowed[randomNumber]
            let img = chosenOption.data.url_overridden_by_dest || chosenOption.data.url

            //console.log(img)

            if (img.endsWith("gifv")) img = img.slice(0, -1)
            //console.log(img)

            let embed = new MessageEmbed()
                .setColor("PURPLE")
                .setTitle(chosenOption.data.title)
                .setDescription(chosenOption.data.author)
                .setImage(img)
                .addField("Information: ", "Up vote: " + chosenOption.data.ups + " / Comment: " + chosenOption.data.num_comments)
                .setURL("https://reddit.com" + chosenOption.data.permalink)

            embed = client.functions.get("functions").setEmbedFooter(embed, client)

            return interaction.reply({ embeds: [embed] });
        } catch (error) {
            return await interaction.reply("Could not fetch from reddit.")
        }
    }
}

async function fetchRedGifUrl(client, img) {
    return client.functions.get("functions").fetch(img, null)
        .then(res => {
            return res.text()
        }).then(data => {
            const cheerio = require("cheerio")
            const html = cheerio.load(data)
            return html('head > meta[property="og:video"]')[0].attribs.content
        })

}