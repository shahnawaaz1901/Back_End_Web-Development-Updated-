import multer from "multer";
import path from "path";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads"));
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storageConfig });
export default upload;
