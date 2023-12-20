import multer from "multer";
import path from "path";

const diskConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename =
      new Date().toISOString().replace(/:/g, "_") + file.originalname;
    cb(null, filename);
  },
  destination: (req, file, cb) => {
    const dest = req.filePath;
    cb(null, dest);
  },
});

const upload = multer({ storage: diskConfig });
export default upload;
