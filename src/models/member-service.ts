import MemberModel from "../schema/Member-model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/errors";
import { MemberType } from "../libs/enums/member-enum";

class MemberService {
    // Define a member model that interacts with the database
    private readonly memberModel;
  
    // Initialize the member model when the service is created
    constructor() {
      this.memberModel = MemberModel; // Assign MemberModel (Mongoose model) to the class variable
    }
  
    // Asynchronously process the signup for a new member
    public async processSignup(input: MemberInput): Promise<Member> {
      // Check if a restaurant member already exists in the database
      const exist = await this.memberModel
        .findOne({ memberType: MemberType.RESTAURANT }) 
        .exec(); 
  
      
      if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
  
     
      try {
        const result = await this.memberModel.create(input); // Create a new member in the database with the provided input
  
        result.memberPassword = ""; 
  
        return result;
      } catch (err) {
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
        .findOne({memberNick: input.memberNick},
            {memberNick: 1, memberPassword: 1}
        )
        .exec();
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        
       const isMatch = input.memberPassword === member.memberPassword;
       if(!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
       }    
       return await this.memberModel.findById(member._id).exec() 
    }
  }
  

export default MemberService;
