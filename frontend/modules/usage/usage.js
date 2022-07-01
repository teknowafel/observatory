// Add Usage to main container
fetch('modules/usage/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getCores();
        getMem();

        setInterval(() => {
            getCores();
            getMem();
        }, 5000);

        importNext();
    });

// Getting RAM and Swap usage
const getMem = () => {
    fetch('memory')
        .then(response => response.json())
        .then(data => {
            const ram = document.getElementById("ram-usage");
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

            cores = document.getElementById("cores");
            cores.innerHTML = "";
            data.cores.forEach(core => {
                cores.innerHTML += `<div class="bg-neutral-700 rounded-md p-1">
                <div class="ease-in-out duration-500 ${core < 50 ? "bg-green-500" : core < 75 ? "bg-amber-500" : "bg-red-500"} whitespace-nowrap text-white rounded-md p-1 text-xs font-bold" style="width: ${core}%">${core}%</div>
            </div>`
            });
        });
}