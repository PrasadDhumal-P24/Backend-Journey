const { greet, rocessTask, processTask } = require("./task");

console.log(process.env.APP_NAME);
console.log(process.env.STUDENT_NAME);

console.log(greet("project complete"));

processTask("DSA Complete").then((result) => {

    console.log(result);
});

async function work() {
    const result = await processTask("ai complete");

    console.log(result)
};

work();


