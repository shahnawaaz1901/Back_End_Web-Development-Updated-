/*
    For using GRUNT Task Runner we need to Create Wrapper function and all 
    of the task which we want to performe is written inside that wrapper 
    function 
*/

module.exports = function (grunt) {
  /* 
        Grunt is Task Runner and task which we want to perfom can be done 
        by using the plugins which grunt is provided to us.

        By using grunt we do one thing that is minifying the javascript , 
        means reduce the size of javascript file size because if a file 
        takes less size then it'll loaded quickly on the browser. The 
        Command for install the uglifying plugin is : "grunt-contrib-uglify" 
    */
  /*
        For using the task Runner please use the latest version of Node.js
        for Prevent any kind of Error
    */
  //* Configure the Task
  /* 
    initConfig takes an Object which object contains the tasks information 
    which task we want to perform  
    */
  grunt.initConfig({
    /*
        Specify task name as key and put all details regarding task inside
        into the value Object.
    */
    uglify: {
      /* 
            uglify takes the target attribut in the value object as the key
            which is responsible for targeting the input file and takes the
            destination of source and destination
        */
      target: {
        /* 
                target takes files as key which value is an object which 
                defines the destination and source file directory.

            */
        files: {
          /* 
                File Takes value in Object where first key is the destination 
                directory along with file name where we want to store the output
                result
            */
          /* 
                min.js is naming convension because we reduce the size of file
                so we store in min.js extension format like controller and repo
                ,routes file
            */
          /* 
                    destination directory in the form of key and value of destination
                    is the source directory inside an array, why array because multiple
                    files we can give to minifying the Javascript file, so we need to
                    put directory one by one. If we want to minifying the all js file
                    in a directory the instead of writing name just write the "*" key
                    and put the extension this means all files with this extension in
                    side the folder
                */
          "dest/js/main.min.js": ["src/js/*.js"], // all js file inside js folder
          /* Another Option */
          // ["./src/js/input1.js","./src/js/input2.js"]
        },
      },
    },
  });

  //* Load Libraries
  /* 
    Above is the task which we want to perform here below we need to specify
    the plugins which we want to use to complete the above tasks, so for this
    we use grunt.loadNpmTasks function which specify the plugins which we want
    to use to perform the tasks. This loadNpmTasks function is common for all
    because every time we do some task or operation we need some library or
    plugin to complete that operations so this line is mendatory. Make Sure
    library or plugins which we specified in loadNpmTasks function is installed
    because if not installed then our function not work properly
    */
  grunt.loadNpmTasks("grunt-contrib-uglify");

  //* Ragister the task
  /* 
    because sometime we need to perform multiple tasks so we need to specify the 
    all task inside the ragister function
    */
  /* 
    Remember that array contains acutal keyt value of taks which we specify 
    grunt.initConfig function  
    */
  grunt.registerTask("default", ["uglify"]);
};

/*
    All is SetUp now but question is how can we run a task runner we can
    run a task runner by grunt-cli ( Command line input ) which we installed
    globally.
*/