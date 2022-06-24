const modules = [
    "./modules/stats/stats.js",
    "./modules/docker/docker.js",
    "./modules/usage/usage.js",
    "./modules/disks/disks.js",
    "./modules/networks/networks.js",
    "./modules/sensors/sensors.js",
    "./modules/connections/connections.js"
];

const importNext = () => {
    if (modules[0]){
        import (modules[0]);
        modules.shift();
    }
}

importNext();