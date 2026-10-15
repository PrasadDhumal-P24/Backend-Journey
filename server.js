// const express = require("express");

// const app = express();


// app.use((req, res, next) => {
//     console.log("Request Received");
//     console.log("URL :", req.url);
//     console.log("METHOD :", req.method);

//     next();
// });

// app.get("/", (req, res) => {

//     res.send("backend join successfully");

// });

// app.get("/about", (req, res) => {
//     res.send("Welcome to about page");
// });

// app.get("/job", (req, res) => {
//     res.send("Welcome to job page");
// });



// Error handling examples

// app.get("/error", (req, res, next) => {
//     console.log("error handler hit");

//     const error = new Error("something went wrong");
//     next(error);
// });

// app.use((err, req, res, next) => {
//     res.status(500).send("server error occured");
// });

// app.get("/error", (req, res, next) => {
//     const error = new Error("Something went wrong");
//     next(error);
// });

// app.use((err, req, res, next) => {
//     res.status(500).send("Server error occurred");
// });



// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
// });











const express = require("express");

const app = express();

// Sample data
const tasks = [
    { id: 1, title: "Learn Node.js", status: "completed" },
    { id: 2, title: "Learn Express", status: "pending" },
    { id: 3, title: "Practice Middleware", status: "pending" }
];

// Middleware
app.use((req, res, next) => {
    console.log("Request received");
    console.log("URL:", req.url);
    console.log("Method:", req.method);

    next();

});

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Student Task Manager API");
});

// Get all tasks
app.get("/tasks", (req, res) => {
    const status = req.query.status;
    let result = tasks;

    if (status) {
        result = tasks.filter((task) => {
            return task.status === status;
        });
    }

    res.status(200).json(result);
});

// Get one task by ID
app.get("/tasks/:id", (req, res) => {
    const taskId = req.params.id;

    const task = tasks.find((item) => {
        return item.id === Number(taskId);
    });

    if (!task) {
        return res.status(404).send("Task not found");
    }

    res.status(200).json(task);
});

// About route
app.get("/about", (req, res) => {
    res.status(200).send("A simple learning project");
});

// Error route
app.get("/error", (req, res, next) => {
    const error = new Error("Something went wrong");
    next(error);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.log("Error:", err.message);
    res.status(500).send("Server error occurred");
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
