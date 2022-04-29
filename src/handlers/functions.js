const { getFiles } = require("../functions/functions")

let errors = "";
//reload true on force reload
module.exports = async (bot, reload) => {
    const { client } = bot
    errors = "";
    //Getting folder "functions" and executing script with every sub-directory as parameter.
    let functions = getFiles(`./src/functions/`, ".js")

    //For file loaded in "functions" variable, take that file.
    for (let file of functions) {
        if (reload) delete require.cache[require.resolve(`../functions/${file}`)];
        let pull = require(`../functions/${file}`); //request file

        // If file have defined name inside, register it as function in to the collection (index.js:8)
        if (pull.name) {
            client.functions.set(pull.name, pull); //Key: function, Value: File(.js) -> basically, if key is called, run value (file)
        } else {
            errors += `${file}\n`
            continue;
        }
        // If file has aliases and aliases are in an Array (List), register each alias in to the collection (index.js:9)
        if (pull.aliases)
            pull.aliases.forEach((alias) => {
                client.aliases.set(alias, pull.name); //adds it to functions
            });
    }
    console.log(`Loaded ${client.functions.size} functions`)
};
