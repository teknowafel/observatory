const sh = require("sh"); // We need sh to run the docker commands
const tableparser = require("table-parser"); // We need table parser to parse the output from docker commands

module.exports = (app) => {
    app.get("/compose", (req, res) => { // Compose endpoint for compose stacks
        sh("docker compose ls").result((output) => { // Run docker compose ls to list stacks
            let stacks = []; // Create an array to hold the stacks
            output.split("\n").slice(1).forEach(stack => { // Iterate through the stacks
                if (stack){ // If the stack is not undefined or null (not a blank line in the table)
                    stacks.push( // Add the stack to the array
                        {
                            "name": stack.split(/\s+/g)[0], // Name of the stack (folder name)
                            "running": stack.split(/\s+/g)[1].includes("running") // Status of the stack
                        }
                    )
                }
            });
            res.send({
                count: stacks.length,
                stacks: stacks
            }); // Send how many stacks and the array of stacks
        });
    });

    app.get("/containers", (req, res) => { // Containers endpoint to get a list of containers
        sh("docker container ls").result((output) => { // Run docker container ls to get all containers (should include stopped)
            let containers = []; // Create an array to hold containers
            tableparser.parse(output).forEach((container) => { // Iterate through the containers
                containers.push({ // Add the container to the array
                    "name": container.NAMES[0], // Name of the container
                    "running": container.STATUS[0].includes("Up") // Status of the container
                });
            });
            res.send({
                count: containers.length,
                containers: containers
            }); // Send the amount of containers and the array
        });
    });
}