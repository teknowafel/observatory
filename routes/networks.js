const fs = require("fs");
const sh = require("sh");
const tableparser = require("table-parser");

module.exports = (app) => {
    app.get("/networks", (req, res) => {
        const interfaces = [];
        fs.readdir("/sys/class/net", (error, files) => {
            files.forEach(interface => {
                interfaces.push(
                    {
                        "name": interface,
                        "rxBytes": fs.readFileSync(`/sys/class/net/${interface}/statistics/rx_bytes`).toString().trim(),
                        "txBytes": fs.readFileSync(`/sys/class/net/${interface}/statistics/tx_bytes`).toString().trim()
                    }
                )
            })

            res.send(interfaces);
        });
    });
}