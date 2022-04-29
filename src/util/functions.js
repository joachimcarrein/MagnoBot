const fs = require("fs")

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f=>f.endsWith(ending))
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

module.exports = {
    getFiles,
    delay,
    fetch
}