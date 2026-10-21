const express = require("express");
const app = express();

const PORT = 5000;

app.use(express.json());

const students = [
    { id: 1, name: "om", course: "CS" },
    { id: 2, name: "priya", course: "IT" },
    { id: 3, name: "sneha", course: "CS" }
];



app.get("/students", (req, res) => {
    const course = req.query.course;

    if (!course) {
        return res.status(200).json(students);
    }

    const filteredStudents = students.filter(
        (student) =>
            student.course.toLowerCase() === course.toLowerCase()
    );

    return res.status(200).json(filteredStudents);
});






app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

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



let nextID = 4;

app.post("/students", (req, res) => {

    const { name, course } = req.body;


    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof course !== "string" ||
        !course.trim()
    ) {
        return res.status(400).json({
            message: "required valid name and course"
        });

    }
    const newStudent = {
        id: nextID++,
        name: name,
        course: course

    };

    students.push(newStudent);

    return res.status(200).json({
        message: "New student add successfully",
        student: newStudent
    });

});


app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, course } = req.body;


    if (
        typeof name !== "string" || !name.trim() ||
        typeof course !== "string" || !course.trim()
    ) {
        return res.status(400).json({
            message: "valid name and course are required"
        });
    }

    const index = students.index(
        (student) => student.id === id
    );

    students[index] = {
        id,
        name: name.trim(),
        course: course.trim()
    };

    return res.status(200).json({
        message: "student update successfully",
        student: students[index]
    });
});


app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(
        (item) => item.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "student not found"
        });
    }
    const { name, course } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "provided a field to update"
        });
    }

    if (name !== undefined) {
        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Invalid names"
            });
        }
        student.course = course.trim();
    }

    return res.status(200).json({
        message: "student updated successfully",
        student
    });

});


app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(
        (student) => student.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "student not found"
        });
    }
    const deletedStudent = students.splice(index, 1)[0]

    return res.status(200).json({
        message: "student deleted successfully",
        student: deletedStudent
    });
})

app.use((req, res) => {
    return res.status(404).json({
        message: "API endpoint not found"
    });
})


app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        message: "internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`server running on this${PORT}`);

});