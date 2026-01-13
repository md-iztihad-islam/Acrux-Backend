// import multer from "multer";
// import multerS3 from "multer-s3";
// import fs from 'fs';
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { s3 } from "./awsConfig.js";
// import { AWS_BUCKET_NAME } from "./serverConfig.js";

// export const s3Uploader = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: AWS_BUCKET_NAME,
//         key: function(_, file, cb){
//             if(!file){
//                 return cb(new Error("No file provided"), null);
//             }

//             if(!["image/jpeg", "image/png", "image/jpg", "image/webp", "application/pdf"].includes(file.mimetype)){
//                 return cb(new Error("Invalid file type, only JPEG, PNG, WebP, and PDF are allowed"), null);
//             }

//             console.log("File received:", file.originalname, file.mimetype);

//             const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

//             const fileName = file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];

//             cb(null, fileName);
//         }
//     })
// })

// // Function to upload the generated PDF to AWS S3
// export const uploadPDFToS3 = async (filePath) => {
//     const fileStream = fs.createReadStream(filePath);

//     const s3Params = {
//         Bucket: AWS_BUCKET_NAME, // Your S3 bucket name
//         Key: `barcodes/barcodes_${Date.now()}.pdf`, // S3 file name (unique)
//         Body: fileStream,
//         ContentType: 'application/pdf',
//     };

//     try {
//         // Create a PutObjectCommand to upload the file
//         const uploadCommand = new PutObjectCommand(s3Params);
//         const uploadResult = await s3.send(uploadCommand); // Upload to S3
//         console.log('PDF uploaded successfully:', uploadResult);

//         // Delete the local file after successful upload
//         fs.unlinkSync(filePath); // Deletes the local PDF file

//         // Return the S3 URL of the uploaded file
//         return `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`;
//     } catch (error) {
//         console.error('Error uploading PDF to S3:', error);
//         throw new Error('Failed to upload PDF to S3');
//     }
// };

import multer from "multer";
import multerS3 from "multer-s3";
import fs from 'fs';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./awsConfig.js";
import { AWS_BUCKET_NAME } from "./serverConfig.js";
import path from 'path';

export const s3Uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        key: function(_, file, cb){
            if(!file){
                return cb(new Error("No file provided"), null);
            }

            if(!["image/jpeg", "image/png", "image/jpg", "image/webp", "application/pdf"].includes(file.mimetype)){
                return cb(new Error("Invalid file type, only JPEG, PNG, WebP, and PDF are allowed"), null);
            }

            console.log("File received:", file.originalname, file.mimetype);

            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

            const fileName = file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];

            cb(null, fileName);
        }
    })
})

// Function to upload the generated PDF to AWS S3
export const uploadPDFToS3 = async (filePath, folder = 'invoices') => {
    try {
        console.log('Uploading PDF to S3 from:', filePath);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileStream = fs.createReadStream(filePath);
        const fileName = path.basename(filePath);

        const s3Params = {
            Bucket: AWS_BUCKET_NAME,
            Key: `${folder}/${fileName}`,
            Body: fileStream,
            ContentType: 'application/pdf',
        };

        const uploadCommand = new PutObjectCommand(s3Params);
        const uploadResult = await s3.send(uploadCommand);
        console.log('PDF uploaded successfully:', uploadResult);

        // Delete the local file after successful upload
        fs.unlinkSync(filePath);

        // Return the S3 URL of the uploaded file
        return `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`;
    } catch (error) {
        console.error('Error uploading PDF to S3:', error);
        throw new Error('Failed to upload PDF to S3: ' + error.message);
    }
};