import { OAuth2Client } from "google-auth-library";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

/*
1 - pegar o idtoken, verificar e pegar os dados do usuario
2 - verificar se há usuario no banco de dados
  SIM - tipo defindo
    - autenticar e liberar o JWT com os dados do usuário
*/


class AuthenticateUserService{
  
  async execute(idToken: string){
    const client = new OAuth2Client(process.env.GOOGLE_ID_CLIENT);
    const finalToken = idToken.replace('Bearer', '');
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
  
    const { email } = ticket.getPayload();

    const googleIdTicket = ticket.getUserId();

    let userPrisma = await  prismaClient.user.findFirst({
      where : {
        mail: email,
      }
    });

    if(!userPrisma){
      throw new AppError('User does not exist yet, check if you are a student', 401);
    }

    if(!userPrisma.googleId || userPrisma.googleId == ""){
      userPrisma = await prismaClient.user.update({
        where:{
          mail: email,
        },
        data: {
          googleId: googleIdTicket,
        }
      });
    }

    const token = sign(
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
        token,
      }
    };
  }
}

export {AuthenticateUserService}
