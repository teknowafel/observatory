const fs = require("fs");
const sh = require("sh");
const tableparser = require("table-parser");

module.exports = (app) => {
    app.get("/networks", (req, res) => {
        sh("netstat -s").result((results) => {
            table = tableparser.parse(results);
            res.send(
                {
                    "establishedConnections": table[28]['Ip:'][0],
                    "tcpRx": table[29]['Ip:'][0],
                    "tcpTx": table[30]['Ip:'][0],
                    "udpRx": table[35]['Ip:'][0],
                    "udpTx": table[38]['Ip:'][0]    
                }
            );
        })
    });
}