// Add template to main container
fetch('modules/search/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        
        // Search box logic
        document.getElementById("btn-search").addEventListener("click", () => {
            fetch("search")
                .then(response => response.text())
                .then(searchUrl => {
                    console.log(searchUrl);
                    const search = document.getElementById("input-search").value;
                    if (search.length > 0) {
                        window.open(`${searchUrl}${search}`, "_blank");
                    }
                });
        });
        
        importNext();
    });