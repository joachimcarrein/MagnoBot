module.exports = {
    name: "rd",
    category: "fun",
    description: "reddit",
    usage: "",
    run: async ({ client, message, args }) => {
        const Reddit = require("../../classes/reddit")

        const subReddit = args.join(" ")

        new Reddit().getReddit(client, message, subReddit)
    }
}