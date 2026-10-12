const express = require("express");

const app = express();

app.get("/student/:id", (req, res) => {
    res.send("Student ID : " + req.params.id);
});

app.get("/student", (req, res) => {
    res.send("Course : " + req.query.course);
});

app.listen(5000, () => {
    console.log("server running on http://localhost:5000");
});