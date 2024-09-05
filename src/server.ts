// Architectural pattern: MVC, Dependency Injection, MVP
// MVC = MODEL VIEW CONTROLLER
// Design pattern: Middleware, Decotar

import dotenv from 'dotenv';
dotenv.config();

//console.log("PORT: ", process.env.PORT)
// Cluster => Database => Collection => Document  -------------------------> Mongodb 

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL as string, {}).then((data) => {
    console.log("MongoDB connected successfuly!");
    const PORT =process.env.PORT ?? 3003;
}).catch((err) => console.log("Error on connection MongoDB ", err));

