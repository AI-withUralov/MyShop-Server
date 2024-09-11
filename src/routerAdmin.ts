import express from "express";
const routerAdmin = express.Router(); // Create router object for admin routes
import restaurantController from "./controllers/restaurant.controller";

// Route for admin home page
routerAdmin.get('/', restaurantController.goHome);

// Route for login page
routerAdmin.get('/login', restaurantController.getLogin);

// Route for signup page
routerAdmin.get('/signup', restaurantController.getSignup);

export default routerAdmin; // Export the admin router
