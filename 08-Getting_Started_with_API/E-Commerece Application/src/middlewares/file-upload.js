import multer from "multer";

const diskStorage = multer.diskStorage({        
        destination : (req, file, cb)=>{
            /* 
                Because Path is On where index.js file is Present so from index.js 
                we Can Directly Access the upload Folder 
            */
            cb(null,'./uploads');
        },

        filename : (req, file, cb)=>{
            const name = "abcd" +  file.originalname;
            cb(null, name);
        }
    }
)


const upload = multer({storage : diskStorage});
export default upload;