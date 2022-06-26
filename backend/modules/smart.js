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
                            "healthCheck": lines[37].split(/\s/).at(-1),
                            "temp": `${lines[41].split(/\s/).at(-2)}° ${lines[41].split(/\s/).at(-1)}`,
                            "powerCycles": lines[50].split(/\s/).at(-1),
                            "poweredHours": lines[51].split(/\s/).at(-1),
                            "integrityErrors": lines[53].split(/\s/).at(-1)
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