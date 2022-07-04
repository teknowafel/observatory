const sh = require("sh");

module.exports = (app) => {
    app.get("/smart", (req, res) => {
        
        sh("smartctl --scan").result((output) => {
            const disks = [];
            output.split("\n").forEach((line) => {
                if (line.split(/\s/)[0]){
                    disks.push(line.split(/\s/)[0]);
                }
            });

            const checkedDisks = [];
            disks.forEach((disk) => {
                sh(`smartctl -a ${disk}`).result((output) => {
                    checkedDisks.push(
                        {
                            "disk": disk,
                            "healthCheck": (output.includes("PASSED")) ? "PASSED" : "FAILED",
                            "errors": (output.includes("No Errors Logged")) ? "No Errors" : "Errors"
                        }
                    );

                    if (checkedDisks.length == disks.length){
                        res.send(checkedDisks);
                    }
                });
            });
        });
    });
}