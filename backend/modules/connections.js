const sh = require("sh");
const tableparser = require("table-parser");

module.exports = (app) => {
    app.get("/netstat", (req, res) => {
        sh("sh ./netstat.sh").result((results) => {
            connections = [];
            table = tableparser.parse(results);
            table.shift();
            table.forEach((connection) => {
                connections.push(
                    {
                        "address": connection['(w/o'][0].split(":")[0],
                        "port": connection['(w/o'][0].split(":")[1],
                        "application": connection['(w/o'][3].split("/")[1]
                    }
                )
            });
            
            let uniqueConnections = connections.filter((c, index) => {
                return connections.indexOf(c) === index;
            });

            res.send(uniqueConnections);
        })
    });
}