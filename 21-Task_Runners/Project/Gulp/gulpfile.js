/* 
    For Run task runner by the single command like gulp or grunt we need to install
    gulp-cli and grunt-cli globally in our computer. Because if we dont do this then
    we can't run gulp and grunt command in the terminal of vs code. So that we can
    use keyword of taskrunner to run the task.
*/

/*
    Grunt takes more JSON Objects but gulp takes more javascript Statements to run
    the task
*/
//*1. Import Gulp 
const gulp = require("gulp");

//*2. Specify the Task
/* 
    use function "task" which takes taskname and a callback it's same as javascript 
    eventlistener where an event is occure then it's corresponding call back is triggered
*/
gulp.task("imagemin", () => {});
function defaultTask(cb) {
  cb();
}

// exports.default = defaultTask;
export default defaultTask;
