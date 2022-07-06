// backend/config.js

module.exports = {
    port: 8080,
    // piholeUrl: "http://10.0.0.1" // URL to the Pi-Hole web interface which is used for API access
    piholeUrl: "http://localhost",
    searchUrl: "https://duckduckgo.com/?q=",
    moduleBlacklist: [ // Add names of modules to the array to blacklist them
        "search"
    ]
};