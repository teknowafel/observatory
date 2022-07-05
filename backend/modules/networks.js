const sh = require("sh"); // We need sh to run netstat
const tableparser = require("table-parser"); // We need table-parser to parse the output of netstat

module.exports = (app) => {
    app.get("/networks", (req, res) => { // Networks endpoint to read network statistics
        let interfaces = []; // Create an array to hold network interfaces
        sh("netstat -i").result((results) => { // Read the output of netstat
            table = tableparser.parse(results); // Parse the output of netstat
            table.splice(0, 2); // Remove the first two rows from the output
            table.forEach(interface => { // Iterate through the networks
                interfaces.push( // Add the interface to the array
                    {
                        "name": interface.Kernel[0], // Name of the interface
                        "rx": parseInt(interface.table[0]), // Packets recieved
                        "tx": parseInt(interface.table[4]) // Packets transmitted
                    }
                )
            });

            res.send(interfaces); // Send back the aray of interfaces
        });
    });
}