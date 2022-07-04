// Add Sensors to main container
fetch('modules/smart/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getSmart();
        setInterval(() => {
            getSmart();
        }, 2000);

        importNext();
    });

// Get Sensor Info
const getSmart = () => {
    fetch('smart')
        .then(response => response.json())
        .then(data => {
            document.getElementById("smart").innerHTML = "";

            data.forEach((disk) => {
                document.getElementById("smart").innerHTML += `<div class="bg-neutral-800 text-white rounded-md p-2 text-sm font-bold mr-4 mb-2">
                <div class="width-auto mb-1">${disk.disk}</div>
                <div class="grid gap-1 grid-cols-3">
                    <div class="bg-${disk.healthCheck == "PASSED" ? "green" : "red"}-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs font-bold text-center">${disk.healthCheck}</div>
                    <div class="bg-${disk.errors == "No Errors" ? "green" : "red"}-400 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs font-bold text-center">${disk.errors}</div>
                </div>
            </div>`;
            })
        });
}