const sh = require("sh");

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
}