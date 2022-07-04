const fs = require("fs"); // We need fs to read data from the sensors

module.exports = (app) => {
    app.get("/sensors", (req, res) => { // Sensors endpoint to check temps
        fs.readdir("/sys/class/thermal", (error, files) => { // Read the directory with each sensor
            let zones = []; // Create an array to hold thermal zones
            if (error) { // Handle errors
                console.error("Error reading temperatures ", error);
                process.exit(1);
            }
            files.forEach(file => { // Iterate through thermal zones directory
                if (file.startsWith("thermal_zone")) { // Check if it is a thermal zone
                    zone = fs.readFileSync(`/sys/class/thermal/${file}/type`).toString().trim(); // Get the type
                    temp = parseInt( // Get the current temperature of the zone
                        fs.readFileSync(`/sys/class/thermal/${file}/temp`).toString().trim()
                    ) / 1000;
                    zones.push( // Add the zone to the array
                        {
                            "name": zone, // Name of the zone
                            "temp": temp // Current temperature
                        }
                    );
                }
            });
            res.send(zones); // Send back the array of thermal zones
        });
    })
}