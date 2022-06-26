const fs = require("fs");

module.exports = (app) => {
    app.get("/sensors", (req, res) => {
        fs.readdir("/sys/class/thermal", (error, files) => {
            zones = []
            if (error) {
                console.error("Error reading temperatures ", error);
                process.exit(1);
            }
            files.forEach(file => {
                if (file.startsWith("thermal_zone")) {
                    zone = fs.readFileSync(`/sys/class/thermal/${file}/type`).toString().trim();
                    temp = parseInt(
                        fs.readFileSync(`/sys/class/thermal/${file}/temp`).toString().trim()
                    ) / 1000;
                    zones.push(
                        {
                            "name": zone,
                            "temp": temp
                        }
                    );
                }
            });
            res.send(zones);
        });
    })
}