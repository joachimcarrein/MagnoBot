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
        const Reddit = require("../../classes/reddit")

        const subReddit = interaction.options.getString("subreddit")

        new Reddit().getReddit(client, interaction, subReddit)
        
    }
}