import express from 'express'
import AWS from 'aws-sdk'

const app = express()

// Get your AWS credentials
const accessKeyId = 'ACCESS_KEY';
const secretAccessKey = 'SECRET_ACCESS_KEY';

// Create an S3 client
const s3Client = new AWS.S3({
      accessKeyId,
      secretAccessKey,
    });
    
app.get('/', function (req, res) {
    // // Upload a file
    // const file = './7e41aaf99307867ad8368c1acf08e0a7.jpg';
    // const bucketName = 'BUCKET_NAME';
  res.send('Hello World')
})


    
    // s3Client.putObject({
        //   Bucket: bucketName,
        //   Key: file,
        //   Body: fs.createReadStream(file),
        // }, (err, data) => {
            //   if (err) {
                //     console.log(err);
                //     return;
                //   }
                
                //   console.log(File ${file} uploaded successfully);
                // });
                app.listen(3000)