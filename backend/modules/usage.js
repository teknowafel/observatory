const cpu = require("cpu-stats"); // We need cpu-stats to get CPU info
const tableparser = require("table-parser"); // We need table parser to parse command output
const sh = require("sh"); // We need sh to run free

module.exports = (app) => {
    app.get("/cpu", (req, res) => { // CPU endpoint to get CPU info
        cpu(1000, (error, result) => { // Run the cpu-stats module to get load
            let total = 0; // Create integer to store total cpu usage
            let cores = []; // Create array to store cores in usage %
            if (error){ // Handle error
                console.log("error getting cpu stats");
            }
            result.forEach((item) => { // Iterate through the cores
                cores.push(Math.trunc(item.cpu)); // Add the core's usage to the array
                total += Math.trunc(item.cpu); // Add to the total CPU usage
            })
            avg = Math.trunc(total / (cores.length) ); // Generate the average cpu usage
            res.send( // Send back
                {
                    "average": avg, // Average usage of a core
                    "cores": cores // Array of core usage
                }
            )
        });
    });

    app.get("/memory", (req, res) => {
        sh("free").result(result => {
            let parsed = tableparser.parse(result);
            mem = Math.trunc( ( parseInt(parsed[0].used[0]) / parseInt(parsed[0].total[0]) ) * 100 )
            swap = Math.trunc( ( parseInt(parsed[1].used[0]) / parseInt(parsed[1].total[0]) ) * 100 )

            res.send({
                "memory": mem,
                "swap": swap
            });
        });
    });
}