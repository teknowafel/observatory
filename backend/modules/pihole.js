const fetch = require("node-fetch");
const config = require("./../config.js");

module.exports = (app) => {
    app.get("/pihole", (req, res) => {
        fetch(`${config.piholeUrl}/admin/api.php`)
            .then(response => response.json())
            .then(data => {
                res.send(data);
            });
    });
}