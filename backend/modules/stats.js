const os = require("os"); // We need os to get OS info
const fs = require("fs"); // We need fs to read motherboard info etc.

module.exports = (app) => {
    app.get("/stats", (req, res) => { // Stats endpoint to read machine stats
        const product = fs.readFileSync("/sys/devices/virtual/dmi/id/product_name").toString(); // Get the name of the machine
        let vendor = fs.readFileSync("/sys/devices/virtual/dmi/id/chassis_vendor").toString(); // Get the vendor of the machine
        if (vendor.includes("Default string")) { // In case the machine is boutique or user-built
            vendor = ""; // There is no vender
        }
        host = `${vendor} ${product}`.trim(); // Concatenate the manufacturer and name to make one string
        hours = Math.trunc(os.uptime()/3600); // Get the hours of uptime using seconds
        minutes = Math.trunc( Math.trunc(os.uptime()/60) - hours*60 ); // Get the remaining minutes of uptime
        uptime = `${hours} Hours, ${minutes} Minutes`; // Create a string based on hours and minutes of uptime
        res.send( // Send back te system info
            {
                "hostname": os.hostname(), // Hostname of the system
                "os": `${os.type()} ${os.release()}`, // The OS which the system is running (Usually kernel version)
                "host": host, // Type of machine and vendor
                "uptime": uptime // Uptime string in hours and minutes
            }
        );
    });
}