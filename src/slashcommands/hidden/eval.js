const fs = require("fs")
module.exports = {
    name: "eval",
    category: "hidden",
    permissions: -1,
    description: "evaluates javascript code",
    options: [
        {
            name: "script",
            description: "A piece of javascript",
            type: "STRING",
            required: true
        },
    ],
    run: async (bot) => {
        let { interaction } = bot
        let message

        var code = interaction.options.getString("script")
        code = code.replace(/(^\`{3}js(\n|\s)*)|((\n|\s)*\`{3}$)/g, ""); //allows the usage of the js code block in discord (```js...```)
        const result = new Promise((resolve, reject) => resolve(eval(code)));

        return result
            .then((output) => {
                let original = output;
                if (typeof output !== "string") {
                    output = require("util").inspect(output, { depth: 1 });
                }

                output = replaceHiddenString(output)

                interaction.reply(output.substring(0, 1900), { //cuts response message short of discord message limit of 2000 chars
                    code: "js",
                });
            })
            .catch((err) => {
                err = err.toString();
                err = replaceHiddenString(err)
                interaction.reply(err, {
                    code: "js",
                });
            });
    }
}

function replaceHiddenString(sourceString) {
    let output = sourceString

    if (fs.existsSync(".env")) {
        let EnvKeys = fs.readFileSync('.env').toString().split('\n')
        EnvKeys.forEach((e, i) => {
            e = e.split('=')[0]
            output = output.replace(process.env[e], `ENV_${e}`)
        })
    }
    
    output = output.replace(process.env.DISCORD_TOKEN, "T0K3N"); //replaces the token 
    output = output.replace(process.env.MONGODB_PASS, "M0NG0DB_P4SS"); //replaces the password

    return output
}