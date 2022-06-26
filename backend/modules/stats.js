const os = require("os");
const fs = require("fs");

module.exports = (app) => {
    app.get("/stats", (req, res) => {
        const product = fs.readFileSync("/sys/devices/virtual/dmi/id/product_name").toString();
        let vendor = fs.readFileSync("/sys/devices/virtual/dmi/id/chassis_vendor").toString();
        if (vendor.includes("Default string")) {
            vendor = ""
        }
        host = `${vendor} ${product}`.trim();
        hours = Math.trunc(os.uptime()/3600)
        minutes = Math.trunc( Math.trunc(os.uptime()/60) - hours*60 )
        uptime = `${hours} Hours, ${minutes} Minutes`
        res.send(
            {
                "hostname": os.hostname(),
                "os": `${os.type()} ${os.release()}`,
                "host": host,
                "uptime": uptime
            }
        )
    });
}