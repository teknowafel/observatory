const fs = require("fs"); // We need fs to read all of the modules

module.exports = (app) => {
    app.get("/modules", (req, res) => { // Modules route to list modules
        fs.readdir("./backend/modules", (error, files) => { // Read the modules folder to find the modules
            let modules = [];
            if (error) {
                console.error("Error reading routes", error);
                process.exit(1);
            }
        
            files.forEach(file => {
                modules.push(file.slice(0, -3)); // Add each module minus the file extension to the modules array
            });

            res.send(modules); // Send back an array of modules
        });
    });
}