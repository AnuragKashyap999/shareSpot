import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

const app = express();

// Enable CORS
app.use(
  cors({
    // Allow requests only from the frontend URL
    origin: process.env.CORS_ORIGIN,

    // Allow cookies and authentication headers
    credentials: true,
  })
);

// Parse JSON data
app.use(express.json({limit:'16kb'}));

// Parse HTML form data
app.use(express.urlencoded({ extended: true , limit:'16kb' }));

// Serve static files from the public folder
app.use(express.static("public"));
app.use(cookieParser());

export default app;