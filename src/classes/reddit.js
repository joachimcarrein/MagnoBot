const superagent = require("superagent");
const { EmbedBuilder, Colors } = require("discord.js")
const { addLog } = require('../functions/logs')

class Reddit {

    constructor() { }

    async getReddit(client, interaction, subReddit) {
        try {
            let url = `https://www.reddit.com/r/${subReddit}.json?sort=top&t=week`
            let result = await client.functions.get("functions").fetch(url, null)
            let body = await result.json()

            //= await superagent
            //    .get(url)
            //    .query({ limit: 800 });

            let allowed = interaction.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            allowed = allowed.filter(post => this.isAllowedType(post.data.url, post.data.url_overridden_by_dest))

            let returnMsg = "No posts found with supported image types."
            if (!interaction.channel.nsfw) returnMsg += " Or which are not NSFW."
            if (!allowed.length) return await interaction.reply(returnMsg);
            const randomNumber = Math.floor(Math.random() * allowed.length);
            const chosenOption = allowed[randomNumber]
            let img = chosenOption.data.url_overridden_by_dest || chosenOption.data.url

            if (img.endsWith("gifv")) img = img.slice(0, -1)
            if (img.includes('redgifs.com')) { img = await fetchRedGifUrl(client, img) }

            let embed = new EmbedBuilder()
                .setColor(Colors.Purple)
                .setTitle(chosenOption.data.title)
                .setDescription(chosenOption.data.subreddit_name_prefixed + ' - ' + chosenOption.data.author)
                .setImage(img)
                .addFields({ name: "Information: ", value: "Upvotes: " + chosenOption.data.ups + " / Comments: " + chosenOption.data.num_comments })
                .setURL("https://reddit.com" + chosenOption.data.permalink)

            embed = client.functions.get("functions").setEmbedFooter(embed, client)

            return await interaction.reply({ embeds: [embed] });
        } catch (error) {
            addLog(error, error.stack)
            return await interaction.reply("Could not fetch from reddit.\n" + error.toString())
        }
    }

    isAllowedType(string, string2) {
        const allowedTypes = ["gif", "gifv", "png", "jpg", "jpeg", "webm", "mp4", "webp", ".svg"]

        let searchString = string2 || string
        for (let suffix of allowedTypes) {
            if (searchString.endsWith(suffix))
                return true;
        }
        //if (searchString.includes('redgifs.com')) return true
        return false;
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

module.exports = Reddit