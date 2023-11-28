import multer from "multer";

const diskStorage = multer.diskStorage({        
        destination : (req, file, cb)=>{
            cb(null,'./uploads');
        },

        filename : (req, file, cb)=>{
            const name = new Date().toISOString().replace(/:/g,'_') +  file.originalname;
            cb(null, name);
        }
    }
)


const upload = multer({storage : diskStorage});
export default upload;