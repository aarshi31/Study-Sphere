import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import agencyRoute from "./routes/agency.route.js";
import applicationRoute from "./routes/application.route.js";
import tutorRoute from "./routes/tutor.route.js";

dotenv.config({});

const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/agency", agencyRoute);
app.use("/api/v1/tutor", tutorRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
