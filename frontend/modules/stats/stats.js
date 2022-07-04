// Add stats to main container
fetch('modules/stats/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getStats();

        setInterval(() => { // Get system stats every minute
            getStats();
        }, 1000 * 60);

        importNext();
    });

const getStats = () => {
    // Getting stats
    fetch('stats')
        .then(response => response.json()) // Use .json() to parse JSON
        .then(data => {
            document.getElementById("hostname").innerHTML = data.hostname;
            document.getElementById("os").innerHTML = data.os;
            document.getElementById("host").innerHTML = data.host;
            document.getElementById("uptime").innerHTML = data.uptime;
        }); // Update the data with system info
}