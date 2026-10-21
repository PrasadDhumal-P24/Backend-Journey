
const express = require("express");

const app = express();
const PORT = 5000;

// Middleware: parse incoming JSON
app.use(express.json());

// Temporary in-memory data
let students = [
    { id: 1, name: "Rahul", course: "CS" },
    { id: 2, name: "Amit", course: "IT" }
];

let nextId = 3;

// 1. GET all students + optional filtering
// Example: GET /students?course=CS
app.get("/students", (req, res) => {
    const { course } = req.query;

    const result = course
        ? students.filter(
            (student) =>
                student.course.toLowerCase() === course.toLowerCase()
        )
        : students;

    return res.status(200).json(result);
});

// 2. GET student by ID
// Example: GET /students/1
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    const student = students.find(
        (item) => item.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    return res.status(200).json(student);
});

// 3. POST: Create a student
app.post("/students", (req, res) => {
    const { name, course } = req.body;

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof course !== "string" ||
        !course.trim()
    ) {
        return res.status(400).json({
            message: "Valid name and course are required"
        });
    }

    const newStudent = {
        id: nextId++,
        name: name.trim(),
        course: course.trim()
    };

    students.push(newStudent);

    return res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});

// 4. PUT: Replace all editable fields
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, course } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof course !== "string" ||
        !course.trim()
    ) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    const index = students.findIndex(
        (student) => student.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students[index] = {
        id,
        name: name.trim(),
        course: course.trim()
    };

    return res.status(200).json({
        message: "Student replaced successfully",
        student: students[index]
    });
});

// 5. PATCH: Update selected fields
app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, course } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    const student = students.find(
        (item) => item.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Provide at least one field to update"
        });
    }

    if (name !== undefined) {
        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Name must be a non-empty string"
            });
        }
        student.name = name.trim();
    }

    if (course !== undefined) {
        if (typeof course !== "string" || !course.trim()) {
            return res.status(400).json({
                message: "Course must be a non-empty string"
            });
        }
        student.course = course.trim();
    }

    return res.status(200).json({
        message: "Student updated successfully",
        student
    });
});

// 6. DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    const index = students.findIndex(
        (student) => student.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1)[0];

    return res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

// Handle unknown routes
app.use((req, res) => {
    return res.status(404).json({
        message: "API endpoint not found"
    });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
