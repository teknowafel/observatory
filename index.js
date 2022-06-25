const fs = require("fs");
const express = require("express")

const app = express()

fs.readdir("./modules", (error, files) => {
    if (error) {
        console.error("Error reading routes", error);
        process.exit(1);
    }

    files.forEach(file => {
        require(`./modules/${file}`)(app);
        console.info(`Loaded module ${file}`)
    })
});

fs.readdir("./endpoints", (error, files) => {
    if (error) {
        console.error("Error reading routes", error);
        process.exit(1);
    }

    files.forEach(file => {
        require(`./endpoints/${file}`)(app);
        console.info(`Loaded endpoint ${file}`)
    })
});


app.listen(8080, () => {
    console.info(`Webserver started on port 8080.`);
});