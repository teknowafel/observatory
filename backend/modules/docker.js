const sh = require("sh");
const tableparser = require("table-parser");

module.exports = (app) => {
    app.get("/compose", (req, res) => {
        sh("docker compose ls").result((output) => {
            stacks = [];
            output.split("\n").slice(1).forEach(stack => {
                if (stack){
                    stacks.push(
                        {
                            "name": stack.split(/\s+/g)[0],
                            "running": stack.split(/\s+/g)[1].includes("running")
                        }
                    )
                }
            });
            res.send({
                count: stacks.length,
                stacks: stacks
            });
        });
    });

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