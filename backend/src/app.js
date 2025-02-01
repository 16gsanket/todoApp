import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

//  to allow the Cross Origin resource Sharing from different IP adressa
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

// enables the server to take in values in json format and keep the file limit ot 16kb
app.use(express.json({limit:"16kb"}));

// emablign the server to hande urlencoded form data ,, url datavfrom browser, it enabled the form data to be included in req.body
app.use(express.urlencoded({ extended: true }));

// to serve the public folder as storage for data for the server
app.use(express.static("public"));

// enables the server to take in cookies
app.use(cookieParser());


export {app}