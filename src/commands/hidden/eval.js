const fs = require("fs")
module.exports = {
    name: "eval",
    aliases: ["ev"],
    category: "hidden",
    permissions: -1,
    description: "evaluates javascript code",
    usage: "<script>",
    run: async (bot) => {
        let {message, args, client, config} = bot
        let guildSettings = await client.functions.get("functions").getGuildSettings(message.guild.id)

        var code = message.content.replace(new RegExp(`${guildSettings.prefix}+ev(al)?`, "gi"), "").trim();
        code = code.replace(/(^\`{3}js(\n|\s)*)|((\n|\s)*\`{3}$)/g, ""); //allows the usage of the js code block in discord (```js...```)
        const result = new Promise((resolve, reject) => resolve(eval(code)));
    
        return result
            .then((output) => {
                let original = output;
                if (typeof output !== "string") {
                    output = require("util").inspect(output, { depth: 1 });
                }

                let EnvKeys = fs.readFileSync('.env').toString().split('\n')
                EnvKeys.forEach((e, i) => {
                    e = e.split('=')[0]
                    output = output.replace(process.env[e], `ENV_${e}`)
                })

                output = output.replace(message.client.token, "T0K3N"); //replaces the token 
                output = output.replace(process.env.MONGODB_PASS, "M0NG0DB_P4SS"); //replaces the password
                          
                message.channel.send(output.substring(0, 1900), { //cuts response message short of discord message limit of 2000 chars
                    code: "js",
                });
            })
            .catch((err) => {
                err = err.toString();
                if (err.includes(message.client.token)) {
                    err = err.replace(message.client.token, "T0K3N"); //replaces the token
                }
                message.channel.send(err, {
                    code: "js",
                });
            });
    }
  }
  