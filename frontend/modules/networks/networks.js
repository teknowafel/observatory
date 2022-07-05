// Add Networks to main container
fetch('modules/networks/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getNetworks();
        setInterval(() => { // Get network data every 5 seconds
            getNetworks();
        }, 5000);

        importNext();
    });

// Get Networking data
const getNetworks = () => {
    fetch('networks')
        .then(response => response.json())
        .then(data => {
            const networks = document.getElementById("networks"); // Get the table body that holds all of the networks
            networks.innerHTML = ""; // Make the networks table body blank
            data.forEach(network => { // Iterate through networks
                console.log(Math.trunc(network.txBytes/1000000))
                networks.innerHTML += `<div class="flex justify-end columns-2 gap-0 bg-neutral-700 text-white rounded-md p-1 text-sm font-bold mr-4 mb-2">
                <div class="inline width-auto text-xs">${network.name}</div>
                <div class="bg-orange-400 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs ml-2 font-bold text-center w-auto inline-block justify-self-end"><i class="las la-upload"></i>${network.tx} Tx</div>
                <div class="bg-blue-400 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs ml-2 font-bold text-center w-auto inline-block justify-self-end"><i class="las la-download"></i>${network.rx} Rx</div>
            </div>`
            }); // Add the network info
        });
}