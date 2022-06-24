// Add Sensors to main container
fetch('modules/netstat/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getConnections();
        setInterval(() => {
            getConnections();
        }, 5000);
    });

// Get connections data
const getConnections = () => {
    fetch('netstat')
        .then(response => response.json())
        .then(data => {
            const connections = document.getElementById("netstat-connections");

            document.getElementById("netstat-connections-count").innerHTML = `${data.length} connections`;

            connections.innerHTML = "";
            data.forEach((connection) => {
                connections.innerHTML += `<tr>
                <td class="p-1">${connection.address}</td>
                <td class="p-1">${connection.port}</td>
                <td class="p-1">${connection.application}</td>
            </tr>`
            });
        });
}