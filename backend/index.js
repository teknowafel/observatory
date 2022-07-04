const fs = require("fs"); // We need fs to read the modules and endpoints
const express = require("express"); // We need express to create the webserver

const app = express(); // Create the express app

fs.readdir("./backend/modules", (error, files) => { // Scan the directory of modules
    if (error) { // Handle errors
        console.error("Error reading routes", error);
        process.exit(1);
    }

    files.forEach(file => { // Iterate through each module
        require(`./modules/${file}`)(app); // Load the module and run its main export to pass through the app object
        console.info(`Loaded module ${file}`);
    })
});

fs.readdir("./backend/endpoints", (error, files) => { // Scan the directory of endpoints
    if (error) { // Handle errors
        console.error("Error reading routes", error);
        process.exit(1);
    }

    files.forEach(file => { // Iterate through endpoints
        require(`./endpoints/${file}`)(app);
        console.info(`Loaded endpoint ${file}`)
    })
});


app.listen(8080, () => { // Run the webserver
    console.info(`Webserver started on port 8080.`);
});