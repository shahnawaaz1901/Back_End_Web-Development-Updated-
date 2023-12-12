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
    /* 
        we ue the cssmin plugin to reduce the size of css file, but in this case 
        we use more options now we specify the multiple objects iside an array as
        value of files key. We can give any name instead of cssmin because at the
        end we register task name along with plugin name
    */
    cssmin: {
      target: {
        /* 
                Inside file we can direcly write directory of output as string
                as key and value of that is source directory array but instead
                of that we explore more options for more clarification 
            */
        files: [
          {
            /* 
                In our uglify code we just write one line for source and destination
                path but here we write path seprately thats why first we specify expand
                so that it can manage the path and combined all path field which we
                provided
            */
            expand: true,
            /* 
                cwd stands for while executing the task what should be the current 
                working directory because our folder is inside the src folder named
                css so we specified the folder details in cwd 
            */
            cwd: "src/css",
            /* 
                src for source which value is an array because it's possible that we 
                we want to minimize multiple css files. Like uglify if we want to mini
                fy all css inside the cwd directory we need to write "*" before the 
                extension, means all the files inside cwd directory which extension is
                .css take all file as input. Second argument of src array is used 
                to exclude the file because we write exclamitory sign means exclude
                "*" means all files which ends with min.css because if file already
                minifyed then we dont need to minifyed that file
            */
            src: ["*.css", "!*min.css"],
            /* 
                dst stands for destination means where we want to store the output file
                which is minifyed after the doing all the task, because we create a 
                folder name "dest" and inside the folder another folder named css put
                the minifyed files into that folder.
            */
            dest: "dest/css",
            /* 
                ext stands for the extension, means what will be the extension of output
                file because in minifying we use the .min naming convension so we use
                the .min.css so that our file is stores by naming the .min.css extension
            */
            ext: ".min.css",
          },
        ],
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
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  //* Ragister the task
  /* 
    because sometime we need to perform multiple tasks so we need to specify the 
    all task inside the ragister function
    */
  /* 
    Remember that array contains acutal keyt value of taks which we specify 
    grunt.initConfig function  
    */
  grunt.registerTask("default", ["uglify", "cssmin"]);
};

/*
    All is SetUp now but question is how can we run a task runner we can
    run a task runner by grunt-cli ( Command line input ) which we installed
    globally.
*/

/* 
    Now questions is why we install these plugins by using the --save -dev
    because we want to install this plugins in dev dependencies form because
    we want that plugins is not use in the production environment because in
    the production environment our code will be automatically minifyed  
*/

/* 
    When We Run the Task Runner on Command Line using the grunt command we can
    see that our js file before minifying is 60Bytes and our css was 246 bytes
    but after minifying and uglifying size of js and css file will be 53 bytes
    and 186 bytes respectively
*/
