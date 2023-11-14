import multer from "multer";
import path from "path";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public", "images"));
  },
  filename: (req, file, cb) => {
    const filename = file.originalname + Date.now();
    cb(null, filename);
  },
});

const upload = multer({ storage: storageConfig });
export default upload;
