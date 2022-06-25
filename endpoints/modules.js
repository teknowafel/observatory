const fs = require("fs");

module.exports = (app) => {
    app.get("/modules", (req, res) => {
        fs.readdir("./modules", (error, files) => {
            let modules = [];
            if (error) {
                console.error("Error reading routes", error);
                process.exit(1);
            }
        
            files.forEach(file => {
                modules.push(file.slice(0, -3));
            });

            res.send(modules);
        });
    });
}