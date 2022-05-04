module.exports = {
    name: "joke",
    aliases: ["j"],
    category: "fun",
    run: async ({ client, message, args }) => {
        let getJoke = async () => {
            //make API call
            let result = await client.functions.get("functions").fetch('https://v2.jokeapi.dev/joke/Any', null)
            //convert to object we can work with
            let json = await result.json()
            return json
        }

        let joke = await getJoke()

        // have our bot reply using the data returned from our API call
        if (!joke.joke) {
            message.reply(`${joke.setup}\n\n${joke.delivery}`)   
        } else {
            message.reply(joke.joke)
        }
    }
}