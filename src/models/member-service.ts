import MemberModel from "../schema/member-model";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member-enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
    private readonly memberModel;
    constructor() {
      this.memberModel = MemberModel; // Assign MemberModel (Mongoose model) to the class variable
    }

/** SPA */

public async getAdmin(): Promise<Member> {
  const result = await this.memberModel
    .findOne({ memberType: MemberType.ADMIN })
    .exec();

  if (!result) {
    throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
  }
  
  return result;
}

public async signup(input:MemberInput): Promise<Member> {
  const salt = await bcrypt.genSalt();
  input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

  try {
    const result = await this.memberModel.create(input);
    result.memberPassword = "";
    return result.toJSON();
  } catch(err) {
    console.error("Error, model:signup", err);
    throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
  }
}

public async login(input: LoginInput): Promise<Member> {
  //  Consider member status later
  const member = await this.memberModel
  .findOne(
    {memberNick: input.memberNick, memberStatus: {$ne: MemberStatus.DELETE}}, //"not equal" to DELETE
    {memberNick:1, memberPassword: 1, MemberStatus: 1} // 1 means include it
  )
  .exec();

  if(!member) throw new Errors (HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
  else if (member.memberStatus === MemberStatus.BLOCK) {
    throw new Errors (HttpCode.FORBIDDEN, Message.BLOCKED_USER)
  }

  const isMatch = await bcrypt.compare(
    input.memberPassword,
    member.memberPassword
  );
  if(!isMatch) {
    throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
  }

  return await this.memberModel.findById(member._id).lean().exec() // oddiy JavaScript obyekti qaytadi, Mongoose hujjati emas -- Oddiy va tezroq ishlaydi, agar faqat ma'lumot kerak bo'lsa
}

public async getMemberDetail(member: Member): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(member._id);
  const result = await this.memberModel
      .findOne({ _id: memberId, memberStatus: MemberStatus.ACTIVE })
      .exec();
      
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  return result;
}

public async updateMember(
  member: Member,
  input: MemberUpdateInput
): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(member._id);
  const result = await this.memberModel
    .findOneAndUpdate({ _id: memberId }, input, { new: true })
    .exec();
    console.log("result", result)

  if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

  return result;
  
}

public async getTopUsers(): Promise<Member[]> {
  const result = await this.memberModel
    .find({
      memberStatus: MemberStatus.ACTIVE,
      memberPoints: { $gte: 1 },// greater than or equal
    })
    .sort({ memberPoints: -1 }) // eng kattasidan
    .limit(4)
    .exec();

  if (!result) {
    throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
  }

  return result;
}

public async addUserPoint(member: Member, point: number): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(member._id);

  return await this.memberModel
    .findOneAndUpdate(
      {
        _id: memberId,
        memberType: MemberType.USER,
        memberStatus: MemberStatus.ACTIVE,
      },
      { $inc: { memberPoints: point } },
      { new: true }
    )
    .exec();
}
/** SSR */

public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.ADMIN  }) 
      .exec(); 
  
   if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);// agar allaqachon bulsa error beradi
      
      console.log("before:", input.memberPassword);
      const salt = await bcrypt.genSalt();
      input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
      console.log("after:", input.memberPassword);
      
    try {
        const result = await this.memberModel.create(input); // Create a new member in the database with the provided input
  
        result.memberPassword = ""; // clientga response bulganda bo'sh string boradi hatto hashed kod ham bormasligi kerak chunki us sensitive data
  
        return result;
    } catch (err) {
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      }
    }
public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
    .findOne({memberNick: input.memberNick},
        {memberNick: 1, memberPassword: 1} // 1 bulsa olib beradi
        )
        .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
      const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
        )
       //const isMatch = input.memberPassword === member.memberPassword;
    if(!isMatch) {
        throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
       }    
    return await this.memberModel.findById(member._id).exec() 
    }
  
public async getUsers(): Promise<Member[]> {
  const result = await this.memberModel.find({memberType: MemberType.USER}).exec();
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
  return result
}

public async updateChosenUser(input: MemberUpdateInput) : Promise <Member> {
  input._id = shapeIntoMongooseObjectId(input._id);
  const result = await this.memberModel.findByIdAndUpdate({_id: input._id}, input, {new: true}).exec()

  if(!result)throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)

  return result
}


}
  

export default MemberService;
