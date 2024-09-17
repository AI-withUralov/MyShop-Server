// Architectural pattern: MVC, Dependency Injection, MVP
// MVC = MODEL VIEW CONTROLLER
// Design pattern: Middleware, Decorator

import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import app from "./app";


// Connect to MongoDB using mongoose
mongoose
  .connect(process.env.MONGO_URL as string, {}) // MongoDB connection URL from environment variables
  .then((data) => {
    console.log("MongoDB connection succeed"); // Log success message
    const PORT = process.env.PORT ?? 3003; // Set the server port, default to 3003 if not provided
    app.listen(PORT, function () {
      console.info(`The server is running successfully on port: ${PORT}`); // Log server status
      console.info(`Admin project is on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err)); // Log any connection errors



