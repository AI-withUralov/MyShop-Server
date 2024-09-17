import { Request, Response } from "express";
import { T } from "../libs/types/common"; 
import MemberService from "../models/member-service"; 
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member-enum";

const memberService = new MemberService();
const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome")
    res.render('home')
  } catch (err) {
    console.log("Error, goHome:", err); // Log any errors
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render('signup')
  } catch (err) {
    console.log("Error, getSignup:", err); // Log any errors
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render('login')
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

