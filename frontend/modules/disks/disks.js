// Add Usage to main container
fetch('modules/disks/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        getDisks();

        setInterval(() => {
            getDisks();
        }, 5000);

        importNext();
    });

// Get Disks data
const getDisks = () => {
    fetch('disks')
        .then(response => response.json())
        .then(data => {
            disks = document.getElementById("disks");
            disks.innerHTML = "";
            data.forEach(disk => {
                disks.innerHTML += `<div class="bg-neutral-700 rounded-md p-1 text-sm font-bold mr-4 mb-3">
                <div class="ease-in-out duration-500 ${disk.percent < 50 ? "bg-green-500" : disk.percent < 75 ? "bg-amber-500" : "bg-red-500"} whitespace-nowrap text-white rounded-md p-1 text-xs font-bold" style="width: ${disk.percent}%">${disk.fs} | ${disk.capacity}</div>
            </div>`
            });
        });
}