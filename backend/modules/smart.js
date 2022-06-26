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
                    const lines = output.split("\n");
                    checkedDisks.push(
                        {
                            "disk": disk,
                            "model": lines[4].replace("Model Number:", "").trim(),
                            "healthCheck": lines[37].replace("SMART overall-health self-assessment test result:", "").trim(),
                            "temp": lines[41].replace("Temperature:", "").trim(),
                            "powerCycles": lines[50].replace("Power Cycles:", "").trim(),
                            "poweredHours": lines[51].replace("Power On Hours:", "").trim(),
                            "integrityErrors": lines[53].replace("Media and Data Integrity Errors:", "").trim()
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