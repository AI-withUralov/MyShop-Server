import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common"; 
import MemberService from "../models/member-service"; 
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member-enum";
import { AdminRequest } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService = new MemberService();
const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome")
    res.render('home') // views file ichidagi home.ejs ni run qiladi
    
  } catch (err) {
    console.log("Error, goHome:", err); // Log any errors
    res.redirect("/admin")
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render('signup') // views file ichidagi signup.ejs ni run qiladi
  } catch (err) {
    console.log("Error, getSignup:", err); // Log any errors
    res.redirect("/admin")
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render('login') // views file ichidagi login.ejs ni run qiladi
    // send | json | redirect | end | render
  } catch (err) {
    console.log("Error, getLogin:", err); // Log any errors
    res.redirect("/admin")
  }
};

adminController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    const file = req.file;
    if (!file) throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG)

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    console.log(newMember)
    newMember.memberType = MemberType.ADMIN;
    const result = await memberService.processSignup(newMember);
    
    req.session.member = result;
    req.session.save(function (){
      res.redirect("/admin/product/all") // signup bulganda shu url ga boradi
    })

 
  } catch (err) {
    console.log("Error, processSignup:", err);
    const message = err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert("${message}"); window.location.replace("/admin/signup"); </script>`);

  }
};

adminController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body:", req.body);
    const input: LoginInput =req.body;
    const result = await memberService.processLogin(input);
    // Sessions Authentications

    req.session.member = result;
    req.session.save(function (){
      res.redirect("/admin/product/all") // login bulganda shu url ga boradi
    })

  } catch (err) {
    console.log("Error, processLogin:", err); // Log any errors
    const message = err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert("${message}"); window.location.replace("/admin/login") </script>`);

  }
};


adminController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function() {
      res.redirect("/admin")
    })
   
  } catch (err) {
    console.log("Error, logout:", err); 
    res.redirect("/admin")
  }
};

adminController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    console.log("result:",result)

    res.render("users", {users: result})
  } catch (err) {
    console.log("Error, getUsers:", err); 
    res.redirect("/admin/login")
  }
};

adminController.updateChosenUser = async(req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");

    const result = await memberService.updateChosenUser(req.body);
    res.status(HttpCode.OK).json({data: result})
  } catch (err) {
    console.log("Error, updateChosenProduct:", err); 
    if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
  }
};



adminController.checkAuthSession = async(req: AdminRequest, res: Response) => {
  try {
    console.log("CheckAuthSession");
    if(req.session?.member)
      res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`)
  } catch(err) {
    console.log("Error,checkAuthSession", err)
  }
};

adminController.verifyAdmin = (
  req: AdminRequest,
  res: Response,
  next: NextFunction) => {
  if (req.session?.member?.memberType === MemberType.ADMIN) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
    );
  }
};

export default adminController;


