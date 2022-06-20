const fs = require("fs");
const cpu = require("cpu-stats");
const sh = require("sh");
const express = require("express")

const app = express()

fs.readdir("./routes", (error, files) => {
    if (error) {
        console.error("Error reading routes", error);
        process.exit(1);
    }

    files.forEach(file => {
        require(`./routes/${file}`)(app);
        console.info(`Loaded endpoint ${file}`)
    })
});

app.listen(8080, () => {
    console.info(`Webserver started on port 8080.`);
})

fs.readdir("/sys/class/thermal", (error, files) => {
    if (error) {
        console.error("Error reading temperatures ", error);
        process.exit(1);
    }
    files.forEach(file => {
        if (file.startsWith("thermal_zone")) {
            zone = fs.readFileSync(`/sys/class/thermal/${file}/type`).toString();
            temp = parseInt(
                fs.readFileSync(`/sys/class/thermal/${file}/temp`).toString()
            ) / 1000;
            //console.log(zone, temp);
        }
    });
    cpu(1000, (error, result) => {
        if (error){
            //console.log("error getting cpu stats");
        }
        result.forEach((item) => {
            //console.log(Math.trunc(item.cpu))
        })
    });
    
});