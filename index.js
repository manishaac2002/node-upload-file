
// ---------------------single file----------------------
import express from 'express';
import multer from 'multer';
const application =express()

application.get('/',(request,response)=>{
console.log("hey");
})

const fileStorage =multer.diskStorage({
    destination:(request,file,callback)=>{
        callback(null,'./images')
    fileName:(request,file,callback)=>{
        callback(null,file.originalname)
    }
    }
})

const fileUploaded =multer({storage:fileStorage})

application.post('/single',fileUploaded.single("images"), (request,response)=>{
    console.log(request.file);

    response.send("Single file uploaded successfully")
})


const port =5004

application.listen(5004,()=>{
    console.log(`Serve is running on the ${port}`);
})