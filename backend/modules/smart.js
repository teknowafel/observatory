const sh = require("sh"); // We need sh to run the smartctl command

module.exports = (app) => {
    app.get("/smart", (req, res) => { // S.M.A.R.T endpoint to check drive status
        
        sh(`chroot /host "smartctl" "--scan"`).result((output) => { // Run smartctl --scan to get a list of SMART disks
            let disks = []; // Create an array to hold he disks
            output.split("\n").forEach((line) => { // Iterate through all disks
                if (line.split(/\s/)[0]){
                    disks.push(line.split(/\s/)[0]); // Add the disk to the array
                }
            });

            const checkedDisks = []; // Create an array to store checked disks
            disks.forEach((disk) => { // Iterate through the disks found
                sh(`chroot /host "smartctl" "-a" "${disk}"`).result((output) => { // Run smartctl -a on the disk to get info
                    let integrityErrors = 0;
                    let temp = 0;
                    let hours = 0;
                    output.split("\n").forEach((line) => { // Read each line of the output
                        if (line.includes("Temperature:")){
                            const split = line.split(" ");
                            temp = split[split.length - 2];
                        } else if (line.includes("Power On Hours:")) {
                            const split = line.split(" ");
                            hours = split[split.length - 1];
                        } else if (line.includes("Media and Data Integrity Errors:")) {
                            const split = line.split(" ");
                            integrityErrors = split[split.length - 1];
                        }
                    });
                    checkedDisks.push( // Add the disk to the array
                        {
                            "disk": disk, // Name of the disk
                            "healthCheck": (output.includes("PASSED")) ? "PASSED" : "FAILED", // If the disk is healthy
                            "integrityErrors": integrityErrors, // If the disk has errors
                            "temp": temp,
                            "hours": hours
                        }
                    );

                    if (checkedDisks.length == disks.length){ // Make sure the amount of disks is correct, otherwise there may be blank ones that don't exist
                        res.send(checkedDisks); // Send back the aray of disks
                        return; // Return to finish the thread
                    }
                });
            });
        });
    });
}
