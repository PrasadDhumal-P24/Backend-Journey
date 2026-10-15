

const express = require("express");

const app = express();

app.get("/jobs/:id", (req, res) => {
    res.status(200).send("Request fetch successfully" + req.params.id);
});



app.get("/student-not-found", (req, res) => {
    res.status(404).send("Student not found");
});




app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});