const enabledModulesConstant = localStorage.getItem("modules") ? JSON.parse(localStorage.getItem("modules")) : []; // Constant list of enabled modules that remains consistent

window.onload = () => {
    document.getElementById("modal-modules-body").innerHTML = ""; // Clear the module modal body of sample info
    fetch('modules') // Check the modules endpoint to get a list of modules available from the backend
        .then(response => response.json()) // Use .json() to parse JSON
        .then(data => {
            data.forEach(module => {
                document.getElementById("modal-modules-body").innerHTML += `<tr>
            <td class="p-1">${module}</td>
            <td class="p-1 w-12"><input id="${module}-selected" type="checkbox" class="default" ${enabledModulesConstant.includes(module) ? "checked" : ""}/></td>
        </tr>`;
            }); // Iterate through modules and add them to the table of available ones
            
    });

    document.getElementById("btn-modal-modules-cancel").addEventListener("click", () => { // When the cancel button is clicked
        const modalBackdrop = document.getElementById("modal-backdrop"); // Get the modules backdrop

        // Hide the modal backdrop
        modalBackdrop.style.width = "0%";
        modalBackdrop.style.height = "0%";

        // Redirect to the main page
        window.location.href = "/";
    });

    document.getElementById("btn-modal-modules-save").addEventListener("click", () => { // When the save button is clicked
        // Get the modal backdrop
        const modalBackdrop = document.getElementById("modal-backdrop");
        
        fetch('modules') // Check the modules endpoint from the backend
            .then(response => response.json()) // Use .json() to parse JSON
            .then(data => {
                let queuedModules = []; // Create an empty array to hold modules o enable
                data.forEach(module => { // Iterate through modules
                    if (document.querySelector(`#${module}-selected:checked`)){ // Check if the checkbox for that module is checked
                        queuedModules.push(module); // If so, add it to the queue
                    }
                });
                localStorage.setItem("modules", JSON.stringify(queuedModules)); // Set the enabled modules in localstorage
                
                // Hide the modal backdrop
                modalBackdrop.style.width = "0%";
                modalBackdrop.style.height = "0%";

                // Redirect to the main page
                window.location.href = "/";
        });
    });
}