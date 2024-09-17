import { Request, Response } from "express"; // Importing types for request and response from Express
import { T } from "../libs/types/common"; // Importing a custom type 'T'
import MemberService from "../models/member-service"; // Importing the MemberService model
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member-enum";

const memberService = new MemberService();
const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome")
    res.send("Home Page"); // Send home page response
  } catch (err) {
    console.log("Error, goHome:", err); // Log any errors
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup Page"); // Send signup page response
  } catch (err) {
    console.log("Error, getSignup:", err); // Log any errors
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page"); // Send login page response
    // send | json | redirect | end | render
  } catch (err) {
    console.log("Error, getLogin:", err); // Log any errors
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);
    // TODO: Sessions Authentications

    res.send(result);
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.send(err);
  }
};

restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body:", req.body);
    const input: LoginInput =req.body;
    const result = await memberService.processLogin(input);
    // TODO: Sessions Authentications


    res.send(result);

  } catch (err) {
    console.log("Error, processLogin:", err); // Log any errors
    res.send(err);
  }
};



export default restaurantController;

