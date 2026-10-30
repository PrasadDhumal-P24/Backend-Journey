const mongoose = require("mongoose");

async function start() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/collegeDB");

        console.log("MongoDB Connected Successfully!");

        // Course Schema
        const courseSchema = new mongoose.Schema({
            courseName: {
                type: String,
                required: true
            }
        });

        const Course = mongoose.model("Course", courseSchema);

        // Student Schema
        const studentSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },

            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: true
            }
        });

        const Student = mongoose.model("Student", studentSchema);

        console.log("Course and Student Models Created!");

        await mongoose.disconnect();
        console.log("MongoDB Disconnected!");

    } catch (error) {
        console.log("Error:", error.message);

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
}

start();
