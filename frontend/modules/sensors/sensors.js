// Add template to main container
fetch('modules/sensors/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getSensors();
        setInterval(() => { // Get temperature data every 2 seconds
            getSensors();
        }, 2000);

        importNext();
    });

// Get Sensor Info
const getSensors = () => {
    fetch('sensors') // Fetch sensor data from the sensors endpoint
        .then(response => response.json()) // Use .json() to parse the json from the response
        .then(data => {
            const sensors = document.getElementById("sensors"); // Get the sensors container
            
            sensors.innerHTML = ""; // Clear the inner HTML
            data.forEach(sensor => {
                sensors.innerHTML += `<div class="bg-neutral-700 rounded-md p-1 text-sm font-bold mr-4 mb-3">
                <div class="ease-in-out duration-500 ${sensor.temp < 40 ? "bg-sky-500" : sensor.temp < 70 ? "bg-amber-500" : "bg-red-500"} whitespace-nowrap text-white rounded-md p-1 text-xs font-bold" style="width: ${sensor.temp}%">${sensor.name} | ${sensor.temp}°C</div>
            </div>`
            }); // Iterate through the sensors and add each one
        });
}