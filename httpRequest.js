//1st example

const express = require("express");

const app = express();

app.get("/jobs", (req, res) => {
    res.status(200).send("Request fetch successfully");
});



app.get("/student-not-found", (req,res)=>{
    res.status(404).send("Student not found");
});




app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});