const express = require("express"); // We need express to use the static feature

module.exports = (app) => {
    app.use(express.static("frontend")); // Use the frontend folder for the frontend
}