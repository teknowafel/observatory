const fs = require("fs");

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
        } else if (file.startsWith("cooling_device")) {
            device = fs.readFileSync(`/sys/class/thermal/${file}/type`).toString();
            state = fs.readFileSync(`/sys/class/thermal/${file}/cur_state`).toString();
            console.log(device, state)
        }
    })
});