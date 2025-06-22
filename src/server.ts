import dotenv from "dotenv";
import mongoose from "mongoose";
import server from "./app";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    server.listen(PORT, function () {
      console.info(`The server is running successfully on port: ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));

// Architectural pattern: MVC, Dependency Injection, MVP
// MVC = MODEL VIEW CONTROLLER
// Design pattern: Middleware, Decorator
