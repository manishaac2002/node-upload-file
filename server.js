import express from 'express';
import multer from 'multer';

const application = express()

// storage engine 
const fileStorage = multer.diskStorage({
    // destination string is helps to find where uploading file
    destination: (request, file, callBack) => {
        callBack(null, './images')
        //fileName
        fileName: (request, file, callBack) => {
            // to rename the originalname of the file
            // to identify add date function
            callBack(null, Date.now() + '--' + file.originalname)
        }
    }
})

// storage property with help of multer function which uploads the file
// storage takes to storage engine to store the files
const fileUpload = multer({ storage: fileStorage })

// to upload the single file route
application.post("/single", fileUpload.single("image"), (request, response) => {
    console.log(request.file);
    response.send("Single file uploaded successfully");
})

// to upload multiple file uploads
application.post("/multipleFile", fileUpload.array("image",3), (request, response) => {
    console.log(request.files);
    // it returns in this form while print the file inn print statement
    // {
//     fieldname: 'image',
//     originalname: 'Bollywood Snapped_ Photo.jpg',
    // encoding: '7bit',//it convert into code form
//     mimetype: 'image/jpeg',
//     destination: './images',
//     filename: 'f73c49b6f4925c298a054b5394ff4f09',
//     path: 'images\\f73c49b6f4925c298a054b5394ff4f09',
//     size: 96854
//   },
    response.send("Multiple file uploaded successfully")
})

// port number
application.listen(1000)