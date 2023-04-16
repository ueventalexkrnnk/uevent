const multer = require('multer')

const fileStorageAvatar = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg"
    ||  file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const uploadAvatar = multer({ 
    storage: fileStorageAvatar,
    fileFilter: fileFilter
});

module.exports = uploadAvatar