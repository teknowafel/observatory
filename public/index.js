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

// Set RAM and Swap usage
const setmem = () => {
    fetch('memory')
    .then(response => response.json())
    .then(data => {
        ram = document.getElementById("ram-usage");
        let classList = ram.classList;
        let classArray = [].slice.apply(classList);

        let bg = classArray.filter(theclass => theclass.startsWith("bg-"))
        ram.classList.replace(bg, 
            data.memory < 50 ? "bg-green-400" : 
            data.memory >= 50 ? "bg-yellow-400" : 
            data.memory >= 75 ? "bg-red-400" :
            ""
        )
        ram.style.width = `${data.memory}%`;
        ram.innerHTML = `RAM | ${data.memory}%`;

        swap = document.getElementById("swap-usage");
        classList = swap.classList;
        classArray = [].slice.apply(classList);

        bg = classArray.filter(theclass => theclass.startsWith("bg-"))
        ram.classList.replace(bg, 
            data.swap < 50 ? "bg-green-400" : 
            data.swap >= 50 ? "bg-yellow-400" : 
            data.swap >= 75 ? "bg-red-400" :
            ""
        )
        swap.style.width = `${data.swap}%`;
        swap.innerHTML = `Swap | ${data.swap}%`;
    });
}

// Getting RAM and Swap usage
setmem();
setInterval(() => {
    setmem()
}, 2000);
