// Add Networks to main container
fetch('modules/networks/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getNetworks();
        setInterval(() => {
            getNetworks();
        }, 5000);

        importNext();
    });

// Get Networking data
const getNetworks = () => {
    fetch('networks')
        .then(response => response.json())
        .then(data => {
            const networks = document.getElementById("networks");
            networks.innerHTML = "";
            data.forEach(network => {
                networks.innerHTML += `<div class="flex justify-end columns-2 gap-0 bg-neutral-700 text-white rounded-md p-1 text-base font-bold mr-4 mb-2">
                <div class="inline width-auto text-sm">${network.name}</div>
                <div class="bg-amber-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-sm ml-2 font-bold text-center w-auto inline-block justify-self-end"><i class="las la-upload"></i>${Math.trunc(network.txBytes/1000000)} Mb Tx</div>
                <div class="bg-blue-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-sm ml-2 font-bold text-center w-auto inline-block justify-self-end"><i class="las la-download"></i>${Math.trunc(network.rxBytes/1000000)} Mb Rx</div>
            </div>`
            });
        });
}