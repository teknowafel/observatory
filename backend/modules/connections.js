const sh = require("sh"); // We need sh to run the netstat command
const tableparser = require("table-parser"); // We need table parser to parse the output from netstat

module.exports = (app) => {
    app.get("/netstat", (req, res) => { // Netstat endpoint for netstat info
        sh("sh ./backend/netstat.sh").result((results) => { // Run the netstat script (runs netstat and redirects errors)
            connections = []; // Create an empty array for connections
            table = tableparser.parse(results); // Parse the results from the netstat command
            table.shift(); // Remove the first row from the results
            table.forEach((connection) => { // Iterate through each current connection that netstat detected
                connections.push( // Add the connection to the array
                    {
                        "address": connection['(w/o'][0]?.split(":")[0], // Where the connection is from/to
                        "port": connection['(w/o'][0]?.split(":")[1], // Port of the connection
                        "application": connection['(w/o'][3]?.split("/")[1] // Application on the host using the connection
                    }
                )
            });
            
            let uniqueConnections = connections.filter((c, index) => { // Filter all of the connections so that there are no duplicates
                return connections.indexOf(c) === index;
            });

            res.send(uniqueConnections); // Send back the array of connections
        })
    });
}
