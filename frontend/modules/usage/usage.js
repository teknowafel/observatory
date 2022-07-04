// Add Usage to main container
fetch('modules/usage/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getCores();
        getMem();

        setInterval(() => { // Get CPU and RAM info every 5 seconds
            getCores();
            getMem();
        }, 5000);

        importNext();
    });

// Getting RAM and Swap usage
const getMem = () => {
    fetch('memory')
        .then(response => response.json()) // Use .json() to parse the JSON
        .then(data => {
            const ram = document.getElementById("ram-usage"); // Get the RAM usage div
            let classList = ram.classList; // Get the list of classes
            let classArray = [].slice.apply(classList); // Create an array from the classlist

            let bg = classArray.filter(theclass => theclass.startsWith("bg-"))[0] // Get the BG class
            ram.classList.replace(bg, 
                data.memory < 50 ? "bg-green-500" : // < 50%: Green
                data.memory >= 50 ? "bg-yellow-500" : // >= 50%: Yellow
                data.memory >= 75 ? "bg-red-500" : // >= 75%: Red
                ""
            )
            ram.style.width = `${data.memory}%`; // Change the width of the usage indicator based on usage
            ram.innerHTML = `RAM | ${data.memory}%`; // Change the indicator to reflect currently used RAM
            
            /*
            Do the same stuff, but for swap instead of RAM
            */
            const swap = document.getElementById("swap-usage");
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

// Get CPU Utilization
const getCores = () => {
    fetch('cpu')
        .then(response => response.json())
        .then(data => {
            /*
            Do the same stuff as before but for CPU usage
            */
            const avg = document.getElementById("cpu-avg");
            let classList = avg.classList;
            let classArray = [].slice.apply(classList);

            let bg = classArray.filter(theclass => theclass.startsWith("bg-"))[0];
            avg.classList.replace(bg, 
                data.average < 50 ? "bg-green-500" : 
                data.average >= 50 ? "bg-yellow-500" : 
                data.average >= 75 ? "bg-red-500" :
                ""
            )
            avg.style.width = `${data.average}%`;
            avg.innerHTML = `Avg | ${data.average}%`;

            const cores = document.getElementById("cores"); // Get the div of cores
            cores.innerHTML = ""; // Clear the div
            data.cores.forEach(core => {
                cores.innerHTML += `<div class="bg-neutral-700 rounded-md p-1">
                <div class="ease-in-out duration-500 ${core < 50 ? "bg-green-500" : core < 75 ? "bg-amber-500" : "bg-red-500"} whitespace-nowrap text-white rounded-md p-1 text-xs font-bold" style="width: ${core}%">${core}%</div>
            </div>`
            }); // Iterate through all cores and add each one with usage, this is why there are not animations for this (it would be complicated, may fix later)
        });
}