import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

class RefreshTokenService{
  async execute(id: string){
    const user = await prismaClient.user.findUnique({where: {id}});
    if(!user){
      throw new AppError("Unable to generate token", 401);
    }
    const token = sign(
      {
        user : {
          id: user.id,
          googleId: user.googleId,
          name: user.name,
          mail: user.mail,
          registration: user.registration,
          isStudent: user.isStudent,
          isProfessor: user.isProfessor,
          isAcademicCenter: user.isAcademicCenter,
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "2d",
      }
    );
    return {
      message: "Success",
      user: {
        data: user,
        token,
      }
    };
  }
}

export {RefreshTokenService}
