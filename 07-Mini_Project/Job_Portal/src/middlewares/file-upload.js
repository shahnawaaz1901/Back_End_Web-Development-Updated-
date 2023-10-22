import multer from "multer";
import path from 'path';

const diskConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join("public","data"));
  },

  filename: (req, file, cb) => {
    const filename = new Date().getTime() + file.originalname;
    cb(null, filename);
  },
});


const upload = multer({storage : diskConfig});
export default upload;