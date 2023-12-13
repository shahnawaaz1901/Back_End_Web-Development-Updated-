/* 
    For Run task runner by the single command like gulp or grunt we need to install
    gulp-cli and grunt-cli globally in our computer. Because if we dont do this then
    we can't run gulp and grunt command in the terminal of vs code. So that we can
    use keyword of taskrunner to run the task. For every project we need to check the
    version of the node.js and as well as version of task runner , so that we can 
    prevent the any unknown kind of error due to version 
*/

/*
    Grunt takes more JSON Objects but gulp takes more javascript Statements to run
    the task
*/
//* 1. Import Gulp and Plugins
import gulp from "gulp";
import imagemin from "gulp-imagemin";
/* 
    we use in this file imagemin to reduce the size of the file of image,
    format which imagemin plugin supports is PNG, JPEG, GIF and SVG (Scaler 
    vector graphics ) 
*/

//* 2. Specify the Task in the gulp using the plugins
/* 
    use function "task" which takes taskname and a callback it's same as javascript 
    eventlistener where an event is occure then it's corresponding call back is triggered
*/
/*
    Gulp use the pipelines to retrieve image which we need to optimize and after doing
    the operation file goes for another to pipe to store the optimize image at the 
    destination
*/
/* 
    we need to set "default" to task so that all task which we want to do can do inside
    the task function, we dont need to specify the which operation we want to perform
    because its specify inside the function where we invoked the plugin function to
    reduce the size of the image 
*/
gulp.task("default", () => {
  //* Define Task
  /*
        In Grunt src is the key which takes the string of path but in gulp src is the
        function which takes path string as a argument 
    */
  /*
        In src function we specify the folder after the folder we need to specify the 
        actual file so we can directly write name or we can use "*" to include the all
        kind of image by different extension or inlcude all extension image file
        src/images/*        :       means all kind of image file in the folder
        src/images/*.jpeg   :       means all kind of jpeg file in the folder
        src/images/*.png    :       means all kind of png file in the folder
  */
  /*
    Gulp supports only ES6 Module of Javascript so make sure use the latest ES6 Syntax
    to import gulp and other gulp plugins
 */
  return gulp
    .src("src/images/*.png") //* once src function found the image or images those images parse to pipeline
    .pipe(imagemin()) //* whatever images src function found that images handover to pipe function then inside pipe function imagemin function is invoked that function optimize the image and reduce the size of the image file
    .pipe(gulp.dest("dest/images")); //* After the Optimizing the image, images goes to another pipe where we need to specify the addres where we want to copy those optimezed images so like src function we have another function gulp.dest which takes address in the form of string
});

