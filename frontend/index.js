const enabledModules = localStorage.getItem("modules") ? JSON.parse(localStorage.getItem("modules")) : [];
const enabledModulesConstant = localStorage.getItem("modules") ? JSON.parse(localStorage.getItem("modules")) : [];

const importNext = () => {
    if (enabledModules[0]){
        import (`./modules/${enabledModules[0]}/${enabledModules[0]}.js`);
        enabledModules.shift();
    } else {
        document.getElementById("modal-backdrop").style.width = "0px";
        document.getElementById("modal-backdrop").style.height = "0px";
    }
}

window.onload = () => {
    importNext();
    document.getElementById("modal-modules-body").innerHTML = "";
    fetch('modules')
        .then(response => response.json())
        .then(data => {
            data.forEach(module => {
                document.getElementById("modal-modules-body").innerHTML += `<tr>
            <td class="p-1">${module}</td>
            <td class="p-1 w-12"><input id="${module}-selected" type="checkbox" class="default" ${enabledModulesConstant.includes(module) ? "checked" : ""}/></td>
        </tr>`;
            });
            
        });

    document.getElementById("btn-modules").addEventListener("click", () => {
        const moduleModal = document.getElementById("modal-modules");
        const modalBackdrop = document.getElementById("modal-backdrop");

        modalBackdrop.style.width = "150%";
        modalBackdrop.style.height = "150%";

        moduleModal.classList.replace("opacity-0", "opacity-100");
    });

    document.getElementById("btn-modal-modules-cancel").addEventListener("click", () => {
        const moduleModal = document.getElementById("modal-modules");
        const modalBackdrop = document.getElementById("modal-backdrop");

        modalBackdrop.style.width = "0%";
        modalBackdrop.style.height = "0%";

        moduleModal.classList.replace("opacity-100", "opacity-0");
    });

    document.getElementById("btn-modal-modules-save").addEventListener("click", () => {
        fetch('modules')
            .then(response => response.json())
            .then(data => {
                let queuedModules = [];
                data.forEach(module => {
                    console.log(`${module}-selected is ${document.querySelector(`#${module}-selected:checked`)}`)
                    if (document.querySelector(`#${module}-selected:checked`)){
                        queuedModules.push(module);
                    }
                });
                localStorage.setItem("modules", JSON.stringify(queuedModules));
                location.reload();
            });
    });
}