const fs = require("fs"); // We need fs to read all of the modules
const config = require("../config.js");

module.exports = (app) => {
    app.get("/modules", (req, res) => { // Modules route to list modules
        fs.readdir("./backend/modules", (error, files) => { // Read the modules folder to find the modules
            let modules = [];
            if (error) {
                console.error("Error reading routes", error);
                process.exit(1);
            }
        
            files.forEach(file => {
                if (!config.moduleBlacklist.includes(file.slice(0, -3))) { // Check if the module is in the blacklist
                    modules.push(file.slice(0, -3)); // Add the module to the list if it is not in the blacklist
                }
            });

            res.send(modules); // Send back an array of modules
        });
    });
}