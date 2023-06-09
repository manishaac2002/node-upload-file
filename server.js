import express from 'express';
import multer from 'multer';
//to connecting aws to upload the file in s3 bucket
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import  S3Client from '@aws-sdk/s3';
// environment variables
import dotenv from 'dotenv'

const application = express()

dotenv.config()

// creating a variables for credentials in env
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const identityPoolId = process.env.IDENTITY_POOL_ID
console.log(bucketName);

// credential details
const s3 = new S3Client({
  // AWS region
  region: 'bucketRegion',
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({
      //  AWS region
      region: 'bucketRegion',
      credentials: {
        // AWS access key ID
        accessKeyId: 'accessKey',
        // AWS secret access key
        secretAccessKey: 'secretAccessKey',
      },
      // Cognito Identity Pool ID
      identityPoolId: 'identityPoolId',
    }),
  }),
});
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
application.post("/single", fileUpload.single("image"), async (request, response) => {
  console.log(request.file);
  const params = {
    Bucket: bucketName,
    Key: request.file.originalname,
    Body: request.file.buffer,
    Content: request.file.mimetype
  }

  const command = new PutObjectCommand(params)
  await s3.send(command)

  response.send("Single file uploaded successfully");
})

// to upload multiple file uploads
application.post("/multipleFile", fileUpload.array("image", 3), (request, response) => {
  console.log(request.files);
  // it returns in this form while print the file inn print statement
  // {
  //     fieldname   : 'image',
  //     originalname: 'Bollywood Snapped_ Photo.jpg',
  //     encoding    : '7bit',//it convert into code form
  //     mimetype    : 'image/jpeg',
  //     destination : './images',
  //     filename    : 'f73c49b6f4925c298a054b5394ff4f09',
  //     path        : 'images\\f73c49b6f4925c298a054b5394ff4f09',
  //     size        :  96854
  //   },
  response.send("Multiple file uploaded successfully")
})

// port number
application.listen(1000)

