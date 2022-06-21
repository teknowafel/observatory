const fs = require("fs");
const express = require("express")

const app = express()

fs.readdir("./routes", (error, files) => {
    if (error) {
        console.error("Error reading routes", error);
        process.exit(1);
    }

    files.forEach(file => {
        require(`./routes/${file}`)(app);
        console.info(`Loaded endpoint ${file}`)
    })
});

app.listen(8080, () => {
    console.info(`Webserver started on port 8080.`);
});