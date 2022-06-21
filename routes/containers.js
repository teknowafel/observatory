const sh = require("sh");
const tableparser = require("table-parser")

module.exports = (app) => {
    app.get("/containers", (req, res) => {
        sh("docker container ls").result((output) => {
            containers = [];
            tableparser.parse(output).forEach((container) => {
                containers.push({
                    "name": container.NAMES[0],
                    "running": container.STATUS[0].includes("Up")
                });
            });
            res.send({
                count: containers.length,
                containers: containers
            });
        });
    });
}