import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Save uploaded files to the 'uploads' folder
        console.log('file uploaded to server')
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
        console.log('file uploaded to server')
    },
});

const upload = multer({ storage: storage });

export default upload