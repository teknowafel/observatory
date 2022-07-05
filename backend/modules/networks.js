const fs = require("fs"); // We need fs to read the statistics

module.exports = (app) => {
    app.get("/networks", (req, res) => { // Networks endpoint to read network statistics
        let interfaces = []; // Create an array to hold network interfaces
        fs.readdir("/sys/class/net", (error, files) => { // Read the directory of networks
            files.forEach(interface => { // Iterate through the networks
                let rxBytes = "";
                let txBytes = "";
                // Read the rx and tx bytes with readFileSync like in the lower part of the code, but using try/catch
                try {
                    rxBytes = fs.readFileSync("/sys/class/net/" + interface + "/statistics/rx_bytes").toString().trim();
                    txBytes = fs.readFileSync("/sys/class/net/" + interface + "/statistics/tx_bytes").toString().trim();
                } catch (error) {
                    console.log(`Error reading network stats for network ${interface}`);
                }

                interfaces.push( // Add the interface to the array
                    {
                        "name": interface, // Name of the interface
                        "rxBytes": rxBytes, // Bytes recieved
                        "txBytes": txBytes // Bytes transmitted
                    }
                )
            });

            res.send(interfaces); // Send back the aray of interfaces
        });
    });
}