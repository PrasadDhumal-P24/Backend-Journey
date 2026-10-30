// const mongoose = require("mongoose");

// async function connectDB() {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/collegeDB");

//         console.log("MongoDB Connected Successfully!");

//         // Step 1: Create Schema
//         const studentSchema = new mongoose.Schema({
//             name: {
//                 type: String,
//                 required: true
//             },

//             course: {
//                 type: String,
//                 required: true,
//                 enum: ["BCA", "CS", "IT"]

//             },

//             year: {
//                 type: Number,
//                 require: true,
//                 min: 1,
//                 max: 4
//             }

//         });

//         // Step 2: Create Model
//         const Student = mongoose.model("Student", studentSchema);

//         console.log("Student Model Created Successfully!");


//         const readstudent = await Student.find();
//         console.log("all students ", readstudent);



//     } catch (error) {
//         console.log("Error:", error.message);
//     }
// }

// connectDB();








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


        // const course = await Course.create({

        //     courseName: "computer science"
        // });

        // console.log("course created ", course);


        // const student = await Student.create({

        //     name: "Om",
        //     course: course._id
        // });

        // console.log("Student created ", student);


        const students = await Student.find().populate("course");

        console.log("All students with courses = ", students);



        // const studentDetails = await Student.findOne({
        //     _id: new mongoose.Types.ObjectId("6ae46503336a19137dcce7e3")
        // }).populate("course");

        // console.log("Student Details:", studentDetails);


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
