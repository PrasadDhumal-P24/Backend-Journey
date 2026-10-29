const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/collegeDB");

        console.log("MongoDB Connected Successfully!");

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
                require: true,
                min: 1,
                max: 4
            }

        });

        // Step 2: Create Model
        const Student = mongoose.model("Student", studentSchema);

        console.log("Student Model Created Successfully!");



        // async function testUpdateValidation() {
        //   try {
        //     await mongoose.connect("mongodb://127.0.0.1:27017/collegeDB");

        //     await Students.updateOne(
        //       { name: "Om" },
        //       { $set: { year: 2 } },
        //       { runValidators: true }
        //     );

        //     console.log("Update Successful!");
        //   } catch (error) {
        //     console.log("Update Validation Failed:");
        //     console.log(error.message);
        //   } finally {
        //     await mongoose.disconnect();
        //   }
        // }

        // testUpdateValidation();

        const readstudent = await Student.find();
        console.log("all students ", readstudent);



    } catch (error) {
        console.log("Error:", error.message);
    }
}

connectDB();