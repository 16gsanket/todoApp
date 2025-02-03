import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import logger from "./utils/logger.js";

dotenv.config({
    path: "/env",
});


connectDB().then(()=>{
    logger.info('datbse suceessfully connected');
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('internal server error');
});


