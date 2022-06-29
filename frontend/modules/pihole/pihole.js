// Add Networks to main container
fetch('modules/pihole/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;

        //document.getElementById("pihole-url").value = localStorage.getItem("pihole-url");
        document.getElementById("pihole-url").value = "poop";
        getPihole();
        setInterval(() => {
            getPihole();
        }, 5000);
        
        importNext();
    });

// Get Pi-Hole data
const getPihole = () => {
    localStorage.setItem("pihole-url", document.getElementById("pihole-url").value);
    fetch(`${localStorage.getItem("pihole-url")}/admin/api.php`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("pihole-adlist-domains").innerHTML = data.domains_being_blocked;
            document.getElementById("pihole-dns-queries").innerHTML = data.dns_queries_today;
            document.getElementById("pihole-ads-blocked").innerHTML = data.ads_blocked_today;
        });
}