// Getting stats
fetch('stats')
    .then(response => response.json())
    .then(data => {
        document.getElementById("hostname").innerHTML = data.hostname;
        document.getElementById("os").innerHTML = data.os;
        document.getElementById("host").innerHTML = data.host;
        document.getElementById("uptime").innerHTML = data.uptime;
    });

setInterval(() => {
    fetch('stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById("uptime").innerHTML = data.uptime;
        });
}, 5000);

// Getting Compose stacks
fetch('compose')
    .then(response => response.json())
    .then(data => {
        document.getElementById("compose-stacks-count").innerHTML = `${data.count} stack${data.count > 1 ? "s" : ""}`
        document.getElementById("compose-stacks").innerHTML = "";

        data.stacks.forEach((stack) => {
            document.getElementById("compose-stacks").innerHTML += `<div class="flex justify-end columns-2 gap-0 bg-neutral-700 text-white rounded-md p-1 text-base font-bold mr-4 mb-2">
            <div class="inline width-auto">${stack.name}</div>
            <div class="bg-${stack.running ? "green" : "red"}-400 whitespace-nowrap text-gray-900 rounded-md p-1 text-sm ml-2 font-bold text-center w-auto inline-block justify-self-end">${stack.running ? "Running" : "Stopped"}</div>
        </div>`
        })
    });