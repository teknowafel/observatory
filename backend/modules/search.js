const config = require("./../config.js"); // We need to import the config to get the pihole url

module.exports = (app) => {
    app.get("/search", (req, res) => { // Search endpoint to get the search URL
        res.send(config.searchUrl); // Send the search url verbatim
    });
}