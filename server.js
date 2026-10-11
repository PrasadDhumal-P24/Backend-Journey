const express = require("express");

const app = express();


app.use((req, res, next) => {
    console.log("Request Received");
    console.log("URL :", req.url);
    console.log("METHOD :", req.method);

    next();
});

app.get("/", (req, res) => {

    res.send("backend join successfully");

});

app.get("/about", (req, res) => {
    res.send("Welcome to about page");
});

app.get("/job", (req, res) => {
    res.send("Welcome to job page");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
