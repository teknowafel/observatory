// Add stats to main container
fetch('modules/stats/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getStats();

        setInterval(() => {
            getStats();
        }, 5000);
    });

const getStats = () => {
    // Getting stats
    fetch('stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById("hostname").innerHTML = data.hostname;
            document.getElementById("os").innerHTML = data.os;
            document.getElementById("host").innerHTML = data.host;
            document.getElementById("uptime").innerHTML = data.uptime;
        });
}