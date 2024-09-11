import { Request, Response } from "express"; // Importing types for request and response from Express
import { T } from "../libs/types/common"; // Importing a custom type 'T'
import MemberService from "../models/Member.service"; // Importing the MemberService model

// Initializing the restaurant controller object with type 'T'
const restaurantController: T = {};

// Define 'goHome' function to handle the home page route
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome")
    res.send("Home Page"); // Send home page response
  } catch (err) {
    console.log("Error, goHome:", err); // Log any errors
  }
};

// Define 'getLogin' function to handle the login page route
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page"); // Send login page response
    // send | json | redirect | end | render
  } catch (err) {
    console.log("Error, getLogin:", err); // Log any errors
  }
};

// Define 'getSignup' function to handle the signup page route
restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup Page"); // Send signup page response
  } catch (err) {
    console.log("Error, getSignup:", err); // Log any errors
  }
};

restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    res.send("Done!"); // Send signup page response
  } catch (err) {
    console.log("Error, processLogin:", err); // Log any errors
  }
};

restaurantController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    res.send("Done!"); // Send signup page response
  } catch (err) {
    console.log("Error, processSignup:", err); // Log any errors
  }
};

export default restaurantController; // Export the restaurant controller
