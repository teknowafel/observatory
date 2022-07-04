const fs = require("fs"); // We need fs to read the statistics

module.exports = (app) => {
    app.get("/networks", (req, res) => { // Networks endpoint to read network statistics
        let interfaces = []; // Create an array to hold network interfaces
        fs.readdir("/sys/class/net", (error, files) => { // Read the directory of networks
            files.forEach(interface => { // Iterate through the networks
                interfaces.push( // Add the interface to the array
                    {
                        "name": interface, // Name of the interface
                        "rxBytes": fs.readFileSync(`/sys/class/net/${interface}/statistics/rx_bytes`).toString().trim(), // Bytes recieved
                        "txBytes": fs.readFileSync(`/sys/class/net/${interface}/statistics/tx_bytes`).toString().trim() // Bytes transmitted
                    }
                )
            });

            res.send(interfaces); // Send back the aray of interfaces
        });
    });
}