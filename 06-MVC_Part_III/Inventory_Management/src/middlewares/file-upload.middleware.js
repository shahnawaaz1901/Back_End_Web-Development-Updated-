import multer from "multer";
import path from "path";
/*
 For Configure the Multure :
 * We Need to Specify Two Things : 
    ? Location for store the file which User Uploads
    ? Name of the File Which We Receive 
*/

//* DiskStorage is Configure How File is Stores
/* diskStorage returns Storage Engine Implementation Configured to Store files on the local file system */
/* In Configure we Need to Specify two things in Object destination and filename */
/* Both Filename and Destination is function takes three Arguments request, file and Callback respectively */
//? req parameter is the request which is sent by the client to the Browser
//? file parameter is Object which Contains All information about Processed file
//? cb is callback to determine storage location in destination and determine name of file in filename

const storageConfig = multer.diskStorage({
  /* Destination Defines location where User Upload File is Stores */
  destination: (req, file, cb) => {
    cb(null, path.resolve("public", "images"));
  },

  /* Filename Defines Name of the file which used to store file with that name */
  filename: (req, file, cb) => {
    /* file.originalname is original name of file in client local machine */
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const uploadFile = multer({ storage: storageConfig });
export default uploadFile;
