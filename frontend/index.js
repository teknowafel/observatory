let enabledModules = localStorage.getItem("modules") ? JSON.parse(localStorage.getItem("modules")) : []; // Get enabled modules from localstorage, this will be manipulated later
const enabledModulesConstant = localStorage.getItem("modules") ? JSON.parse(localStorage.getItem("modules")) : []; // Constant list of enabled modules that remains consistent

const importNext = () => { // Method to import each next module when called by the last one, customization of loading order is coming soon
    if (enabledModules[0]){ // Check if there are still enabed modules left to import
        import (`./modules/${enabledModules[0]}/${enabledModules[0]}.js`); // Import the module
        enabledModules.shift(); // Remove the first one from the array
    } else {
        // Close the modal backdrop
        document.getElementById("modal-backdrop").style.width = "0px";
        document.getElementById("modal-backdrop").style.height = "0px";
    }
}

window.onload = () => { // Stuff to run once the window is loaded
    importNext(); // ImportNext to start the chain reaction of module imports
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

    document.getElementById("btn-modules").addEventListener("click", () => { // When the modules button on the homepage is clicked,
        const moduleModal = document.getElementById("modal-modules"); // Get the modules modal
        const modalBackdrop = document.getElementById("modal-backdrop"); // Get the modal backdrop

        // Make the backdrop fill the browser
        modalBackdrop.style.width = "150%";
        modalBackdrop.style.height = "150%";

        moduleModal.classList.replace("opacity-0", "opacity-100"); // Make the modal visible again, we use opacity because there is no transition for display
    });

    document.getElementById("btn-modal-modules-cancel").addEventListener("click", () => { // When the cancel button is clicked
        const moduleModal = document.getElementById("modal-modules"); // Get the modules modal
        const modalBackdrop = document.getElementById("modal-backdrop"); // Get the modules backdrop

        // Hide the modal backdrop
        modalBackdrop.style.width = "0%";
        modalBackdrop.style.height = "0%";

        moduleModal.classList.replace("opacity-100", "opacity-0"); // Hide the modules modal, we use opacity because there is no transition for display
    });

    document.getElementById("btn-modal-modules-save").addEventListener("click", () => { // When the save button is clicked
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
                location.reload(); // Reload the page to reflect the new changes
            });
    });
}