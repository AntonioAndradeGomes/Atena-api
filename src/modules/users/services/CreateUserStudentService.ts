import { OAuth2Client } from "google-auth-library";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  token: string,
  code: string,
  registration : string,
}


class CreateUserStudentService{
  async execute({token, code, registration} : IRequest){
    const client = new OAuth2Client(process.env.GOOGLE_ID_CLIENT);
    const finalToken = token.replace('Bearer', '');
    if(!finalToken){
      throw new AppError("There is no id token Google", 401);
    }
    const ticket = await client.verifyIdToken({
      idToken: finalToken,
      audience: process.env.GOOGLE_ID_CLIENT,
    }).catch((err) => {
      //console.log(err);
      return null;
    });

    if(!ticket){
      throw new AppError("Invalid Google id token", 401);
    } 

    const googleIdTicket = ticket.getUserId();
    const { email, name } = ticket.getPayload();

    let userPrisma = await  prismaClient.user.findFirst({
      where : {
        mail: email,
      }
    });

    if(userPrisma){
      throw new AppError('User already exists, use the authentication method', 401);
    }

    //TODO: verificar o code

    userPrisma = await prismaClient.user.create({
      data: {
        isStudent: true,
        isProfessor: false,
        isAcademicCenter: false,
        name,
        mail: email,
        registration,
        code,
        googleId: googleIdTicket,
      }
    });

    const tokenfinal = sign(
      {
        user : {
          id: userPrisma.id,
          googleId: userPrisma.googleId,
          name: userPrisma.name,
          mail: userPrisma.mail,
          registration: userPrisma.registration,
          isStudent: userPrisma.isStudent,
          isProfessor: userPrisma.isProfessor,
          isAcademicCenter: userPrisma.isAcademicCenter,
        }
      },
      process.env.JWT_SECRET,
      {
        subject: userPrisma.id,
        expiresIn: "1d",
      }
    );

    return {
      message: "Success",
      user: {
        data: userPrisma,
        token: tokenfinal,
      }
    };
  }
}

export { CreateUserStudentService }
