import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/member-service";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors from  "../libs/Errors"
import AuthService from "../models/auth-service";


const memberService = new MemberService();
const memberController: T = {};
const authService = new AuthService;

memberController.signup = async (req: Request, res:Response) => {
    try {
        console.log("signup");
        const input: MemberInput = req.body,
            result: Member = await memberService.signup(input),
            token = await authService.createToken(result);
        console.log("Tokenlar 1 :", token)
        
        res.json({member: result})
    } catch (err) {
        console.log("Error, signup", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        
    }
};

memberController.login = async (req: Request, res: Response) => {
    try{
        console.log("login");
        const input: LoginInput = req.body,
            result = await memberService.login(input),
            token = await authService.createToken(result);
        console.log("Tokenlar:", token)

        
        res.json({member: result})
    } catch (err) {
        console.log("Error, login:", err)
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}
// React loyihasi
export default memberController;
