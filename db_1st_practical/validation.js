
const mongoose = require("mongoose");

// Step 1: Create Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true,
        enum: ["BCA", "CS", "IT"]
    },

    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    }
});

// Step 2: Create Model
const Student = mongoose.model("Student", studentSchema);

// Step 3: Test Update Validation
async function testUpdateValidation() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/collegeDB");

        console.log("MongoDB Connected Successfully!");

        const result = await Student.updateOne(
            { name: "Om" },
            { $set: { course: "IT" } },
            { runValidators: true }
        );

        console.log("Update Result:", result);

    } catch (error) {
        console.log("Update Validation Failed:");
        console.log(error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testUpdateValidation();
