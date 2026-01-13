import express from 'express';
import { SERVER_PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apiRouter from './routes/apiRouter.js';
import { s3Uploader } from './config/multerConfig.js';

//Creating an express app

const app = express();

//Middlewares

app.use(express.json());                                                                                                                                                                                                  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}))


//Routing middleware

app.use("/api", apiRouter);

//ping route to test the server status

app.get('/ping', (_, res) => {
    res.json({
        message: 'pong',
        report: 'Server is active'
    });
})

const testHandler = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("Uploaded file details:", file);

        return res.status(200).json({ 
            message: "File uploaded successfully", 
            fileLocation: file.location 
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Error uploading file" });
    }
}

app.post("/test", s3Uploader.single("image"), testHandler)

//Starting the server

app.listen(SERVER_PORT, () => {
    connectDB();
    console.log(`Server is running on port ${SERVER_PORT}`);
})