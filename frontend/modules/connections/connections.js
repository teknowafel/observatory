// Add the template to main container
fetch('modules/connections/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getConnections();
        setInterval(() => { // Pull from the backend every 5 seconds
            getConnections();
        }, 5000);

        importNext(); // Call importNext
    });

const getConnections = () => { // Get connections data
    fetch('netstat')
        .then(response => response.json()) // Use .json() to process the JSON data
        .then(data => {
            const connections = document.getElementById("netstat-connections"); // Get the connections container

            document.getElementById("netstat-connections-count").innerHTML = `${data.length} connections`; // Set the amount of connctions

            connections.innerHTML = ""; // Clear the connection container
            data.forEach((connection) => { // Iterate through the connections
                connections.innerHTML += `<tr>
                <td class="p-1">${connection.address}</td>
                <td class="p-1">${connection.port}</td>
                <td class="p-1">${connection.application}</td>
            </tr>`
            }); // Add a row to the table with the address, port, and application
        });
}