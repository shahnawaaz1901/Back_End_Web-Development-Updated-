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
            console.log(new Date().toISOString());
            const name = new Date().toISOString().replace(/:/g,'_') +  file.originalname;
            console.log(name);
            cb(null, name);
        }
    }
)


const upload = multer({storage : diskStorage});
export default upload;