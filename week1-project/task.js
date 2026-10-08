function greet(task) {
    return "task : " + task
};

function processTask(task) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve("Task : " + task)

        }, 1000);

    });
}

module.exports = {
    greet,
    processTask
};
