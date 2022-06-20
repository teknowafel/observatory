const fs = require("fs");
const cpu = require("cpu-stats");
const table = require("table-parser");
const sh = require("sh");
const { parse } = require("path");

fs.readdir("/sys/class/thermal", (error, files) => {
    if (error) {
        console.error("Error reading temperatures ", error);
        process.exit(1);
    }
    files.forEach((file) => {
        if (file.startsWith("thermal_zone")) {
            zone = fs.readFileSync(`/sys/class/thermal/${file}/type`).toString();
            temp = parseInt(
                fs.readFileSync(`/sys/class/thermal/${file}/temp`).toString()
            ) / 1000;
            console.log(zone, temp);
        }
    });
    cpu(1000, (error, result) => {
        if (error){
            console.log("error getting cpu stats");
        }
        result.forEach((item) => {
            console.log(Math.trunc(item.cpu))
        })
    });
    sh("free").result(result => {
        let parsed = table.parse(result);
        mem = Math.trunc( ( parseInt(parsed[0].used[0]) / parseInt(parsed[0].total[0]) ) * 100 )
        swap = Math.trunc( ( parseInt(parsed[1].used[0]) / parseInt(parsed[1].total[0]) ) * 100 )
        console.log(`Memory: ${mem}% Swap: ${swap}%`)
    });
});