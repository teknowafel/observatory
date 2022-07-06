// backend/config.js

module.exports = {
    // piholeUrl: "http://10.0.0.1" // URL to the Pi-Hole web interface which is used for API access
    piholeUrl: "http://localhost",
    searchUrl: "https://duckduckgo.com/?q=",
    moduleBlacklist: [
        "search"
    ]
};