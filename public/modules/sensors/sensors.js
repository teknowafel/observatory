// Add Sensors to main container
fetch('modules/sensors/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getSensors();
        setInterval(() => {
            getSensors();
        }, 2000);
    });

// Get Sensor Info
const getSensors = () => {
    fetch('sensors')
        .then(response => response.json())
        .then(data => {
            sensors = document.getElementById("sensors");
            
            sensors.innerHTML = "";
            data.forEach(sensor => {
                sensors.innerHTML += `<div class="bg-neutral-700 rounded-md p-1 text-base font-bold mr-4 mb-3">
                <div class="ease-in-out duration-500 ${sensor.temp < 40 ? "bg-sky-500" : sensor.temp < 70 ? "bg-amber-500" : "bg-red-500"} whitespace-nowrap text-white rounded-md p-1 text-sm font-bold" style="width: ${sensor.temp}%">${sensor.name} | ${sensor.temp}°C</div>
            </div>`
            })
        });
}