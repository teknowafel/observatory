const fetch = require("node-fetch"); // We need node fetch to get pihole api
const config = require("./../config.js"); // We need to import the config to get the pihole url

module.exports = (app) => {
    app.get("/pihole", (req, res) => { // Pihole endpoint for pihole statistics, acts like a proxy for pihole api
        fetch(`${config.piholeUrl}/admin/api.php`) // Fetch the pihole api endpoint
            .then(response => response.json()) // Use json() to parse the json
            .then(data => {
                res.send(data); // Send the data from the api verbatim
            });
    });
}