// Add template to main container
fetch('modules/smart/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getSmart();
        setInterval(() => { // Get the smart data every 2 seconds
            getSmart();
        }, 2000);

        importNext();
    });

// Get Sensor Info
const getSmart = () => {
    fetch('smart') // Get smart data from the smart endpoint
        .then(response => response.json()) // Use .json() to parse the json from the response
        .then(data => {
            document.getElementById("smart").innerHTML = ""; // clear the smart div

            data.forEach((disk) => {
                document.getElementById("smart").innerHTML += `<div class="bg-neutral-800 text-white rounded-md p-2 text-sm font-bold mr-4 mb-2">
                <div class="width-auto mb-1">${disk.disk}</div>
                <div class="grid gap-1 grid-cols-3">
                    <div class="bg-${disk.healthCheck == "PASSED" ? "green" : "red"}-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs font-bold text-center">${disk.healthCheck}</div>
                    <div class="bg-${disk.errors == "No Errors" ? "green" : "red"}-400 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs font-bold text-center">${disk.errors}</div>
                </div>
            </div>`;
            }); // Iterate through each disk and add data
        });
}