const tableparser = require("table-parser");
const sh = require("sh");

module.exports = (app) => {
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
    })
}