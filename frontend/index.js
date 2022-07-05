let enabledModules = localStorage.getItem("modules") ? JSON.parse(localStorage.getItem("modules")) : []; // Get enabled modules from localstorage, this will be manipulated later

const importNext = () => { // Method to import each next module when called by the last one, customization of loading order is coming soon
    if (enabledModules[0]){ // Check if there are still enabed modules left to import
        import (`./modules/${enabledModules[0]}/${enabledModules[0]}.js`); // Import the module
        enabledModules.shift(); // Remove the first one from the array
    }
}

window.onload = () => { // Stuff to run once the window is loaded
    importNext(); // ImportNext to start the chain reaction of module imports

    document.getElementById("btn-modules").addEventListener("click", () => { // Redirect to the preferences page
        // Get the modal backdrop
        const modalBackdrop = document.getElementById("modal-backdrop");
        
        // Show the modal backdrop
        modalBackdrop.style.width = "150%";
        modalBackdrop.style.height = "150%";

        // Redirect to the preferences page
        window.location.href = "/preferences.html";
    });

}