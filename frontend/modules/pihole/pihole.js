// Add template to main container
fetch('modules/pihole/template.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("container-main").innerHTML += data;
        
        getPihole();
        setInterval(() => { // Get Pi-Hole data every 5 seconds
            getPihole();
        }, 5000);
        
        importNext();
    });

// Get Pi-Hole data
const getPihole = () => {
    fetch("pihole") // Fetch from the pihole api endpoint
        .then(response => response.json())
        .then(data => {
            document.getElementById("pihole-adlist-domains").innerHTML = data.domains_being_blocked;
            document.getElementById("pihole-dns-queries").innerHTML = data.dns_queries_today;
            document.getElementById("pihole-ads-blocked").innerHTML = data.ads_blocked_today;
        }); // Add Pi-Hole API data to the DOM
}