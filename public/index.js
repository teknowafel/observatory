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

window.onload = () => {
    document.getElementById("btn-modules").addEventListener("click", () => {
        const moduleModal = document.getElementById("modal-modules");
        const modalBackdrop = document.getElementById("modal-backdrop");

        modalBackdrop.style.width = "150%";
        modalBackdrop.style.height = "150%";

        moduleModal.classList.replace("opacity-0", "opacity-100");
    });

    document.getElementById("btn-modal-modules-cancel").addEventListener("click", () => {
        const moduleModal = document.getElementById("modal-modules");
        const modalBackdrop = document.getElementById("modal-backdrop");

        modalBackdrop.style.width = "0%";
        modalBackdrop.style.height = "0%";

        moduleModal.classList.replace("opacity-100", "opacity-0");
    });

    document.getElementById("btn-modal-modules-save").addEventListener("click", () => {

    });
}