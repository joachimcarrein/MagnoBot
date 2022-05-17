module.exports = {
    name: "joke",
    category: "fun",
    description: "Shows a joke",
    run: async ({ client, interaction }) => {
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
            await interaction.reply(`${joke.setup}\n\n${joke.delivery}`)   
        } else {
            await interaction.reply(joke.joke)
        }
    }
}