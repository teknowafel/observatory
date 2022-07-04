const sh = require("sh"); // We need sh to run the smartctl command

module.exports = (app) => {
    app.get("/smart", (req, res) => { // S.M.A.R.T endpoint to check drive status
        
        sh("smartctl --scan").result((output) => { // Run smartctl --scan to get a list of SMART disks
            let disks = []; // Create an array to hold he disks
            output.split("\n").forEach((line) => { // Iterate through all disks
                if (line.split(/\s/)[0]){
                    disks.push(line.split(/\s/)[0]); // Add the disk to the array
                }
            });

            const checkedDisks = []; // Create an array to store checked disks
            disks.forEach((disk) => { // Iterate through the disks found
                sh(`smartctl -a ${disk}`).result((output) => { // Run smartctl -a on the disk to get info
                    checkedDisks.push( // Add the disk to the array
                        {
                            "disk": disk, // Name of the disk
                            "healthCheck": (output.includes("PASSED")) ? "PASSED" : "FAILED", // If the disk is healthy
                            "errors": (output.includes("No Errors Logged")) ? "No Errors" : "Errors" // If the disk has errors
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