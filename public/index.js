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
const getStacks = () => {
    fetch('compose')
        .then(response => response.json())
        .then(data => {
            document.getElementById("compose-stacks-count").innerHTML = `${data.count} stack${data.count > 1 ? "s" : ""}`
            document.getElementById("compose-stacks").innerHTML = "";

            data.stacks.forEach((stack) => {
                document.getElementById("compose-stacks").innerHTML += `<div class="flex justify-end columns-2 gap-0 bg-neutral-700 text-white rounded-md p-1 text-base font-bold mr-4 mb-2">
                <div class="inline width-auto">${stack.name}</div>
                <div class="bg-${stack.running ? "green" : "red"}-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-sm ml-2 font-bold text-center w-auto inline-block justify-self-end">${stack.running ? "Running" : "Stopped"}</div>
            </div>`
            })
        });
}
getStacks();
setInterval(() => {
    getStacks()
}, 5000);

// Getting docker containers
const getContainers = () => {
    fetch('containers')
        .then(response => response.json())
        .then(data => {
            document.getElementById("docker-containers-count").innerHTML = `${data.count} container${data.count > 1 ? "s" : ""}`
            document.getElementById("docker-containers").innerHTML = "";

            data.containers.forEach((container) => {
                document.getElementById("docker-containers").innerHTML += `<div class="flex justify-end columns-2 gap-0 bg-neutral-700 text-white rounded-md p-1 text-base font-bold mr-4 mb-2">
                <div class="inline width-auto">${container.name}</div>
                <div class="bg-${container.running ? "green" : "red"}-500 whitespace-nowrap text-gray-900 rounded-md p-1 text-sm ml-2 font-bold text-center w-auto inline-block justify-self-end">${container.running ? "Running" : "Stopped"}</div>
            </div>`
            })
        });
}
getContainers();
setInterval(() => {
    getContainers()
}, 5000);

// Getting RAM and Swap usage
const setmem = () => {
    fetch('memory')
        .then(response => response.json())
        .then(data => {
            ram = document.getElementById("ram-usage");
            let classList = ram.classList;
            let classArray = [].slice.apply(classList);

            let bg = classArray.filter(theclass => theclass.startsWith("bg-"))[0]
            ram.classList.replace(bg, 
                data.memory < 50 ? "bg-green-500" : 
                data.memory >= 50 ? "bg-yellow-500" : 
                data.memory >= 75 ? "bg-red-500" :
                ""
            )
            ram.style.width = `${data.memory}%`;
            ram.innerHTML = `RAM | ${data.memory}%`;

            swap = document.getElementById("swap-usage");
            classList = swap.classList;
            classArray = [].slice.apply(classList);

            bg = classArray.filter(theclass => theclass.startsWith("bg-"))[0]
            ram.classList.replace(bg, 
                data.swap < 50 ? "bg-green-500" : 
                data.swap >= 50 ? "bg-yellow-500" : 
                data.swap >= 75 ? "bg-red-500" :
                ""
            )
            swap.style.width = `${data.swap}%`;
            swap.innerHTML = `Swap | ${data.swap}%`;
    });
}
setmem();
setInterval(() => {
    setmem()
}, 2000);

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
getSensors();
setInterval(() => {
    getSensors();
}, 2000);

// Get CPU Utilization
const getCores = () => {
    fetch('cpu')
        .then(response => response.json())
        .then(data => {
            avg = document.getElementById("cpu-avg");
            let classList = avg.classList;
            let classArray = [].slice.apply(classList);

            let bg = classArray.filter(theclass => theclass.startsWith("bg-"))[0];
            ram.classList.replace(bg, 
                data.average < 50 ? "bg-green-500" : 
                data.average >= 50 ? "bg-yellow-500" : 
                data.average >= 75 ? "bg-red-500" :
                ""
            )
            avg.style.width = `${data.average}%`;
            avg.innerHTML = `Avg | ${data.average}%`;

            cores = document.getElementById("cores");
            cores.innerHTML = "";
            data.cores.forEach(core => {
                cores.innerHTML += `<div class="bg-neutral-700 rounded-md p-1">
                <div class="ease-in-out duration-500 ${core < 50 ? "bg-green-500" : core < 75 ? "bg-amber-500" : "bg-red-500"} whitespace-nowrap text-white rounded-md p-1 text-sm font-bold" style="width: ${core}%">${core}%</div>
            </div>`
            });
        });
}
getCores();
setInterval(() => {
    getCores();
}, 5000);