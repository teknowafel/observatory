// Add the template to main container
fetch('modules/docker/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getStacks();
        getContainers();

        setInterval(() => { // Get stack and container info every 5 seconds
            getStacks()
            getContainers();
        }, 5000);

        importNext();
    });

// Getting Compose stacks
const getStacks = () => {
    fetch('compose')
        .then(response => response.json())
        .then(data => {
            document.getElementById("compose-stacks-count").innerHTML = `${data.count} stack${data.count > 1 ? "s" : ""}`
            document.getElementById("compose-stacks").innerHTML = "";

            data.stacks.forEach((stack) => {
                document.getElementById("compose-stacks").innerHTML += `<div class="flex justify-end columns-2 gap-0 bg-neutral-700 text-white rounded-md p-1 text-sm font-bold mr-4 mb-2">
                <div class="inline width-auto">${stack.name}</div>
                <div class="bg-${stack.running ? "green" : "red"}-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs ml-2 font-bold text-center w-auto inline-block justify-self-end">${stack.running ? "Running" : "Stopped"}</div>
            </div>`
            })
        });
}

// Getting docker containers
const getContainers = () => {
    fetch('containers')
        .then(response => response.json())
        .then(data => {
            document.getElementById("docker-containers-count").innerHTML = `${data.count} container${data.count > 1 ? "s" : ""}`
            document.getElementById("docker-containers").innerHTML = "";

            data.containers.forEach((container) => {
                document.getElementById("docker-containers").innerHTML += `<div class="flex justify-end columns-2 gap-0 bg-neutral-700 text-white rounded-md p-1 text-sm font-bold mr-4 mb-2">
                <div class="inline width-auto">${container.name}</div>
                <div class="bg-${container.running ? "green" : "red"}-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-xs ml-2 font-bold text-center w-auto inline-block justify-self-end">${container.running ? "Running" : "Stopped"}</div>
            </div>`
            })
        });
}