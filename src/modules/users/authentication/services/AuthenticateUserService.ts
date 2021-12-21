import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  mail: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ mail, password }: IRequest) {
    let userPrisma = await prismaClient.user.findFirst({
      where: {
        mail,
      },
    });

    if (!userPrisma) {
      throw new AppError("Iconrrect email/password combination", 401);
    }

    const passwordConfirmed = await compare(password, userPrisma.password);

    if (!passwordConfirmed) {
      throw new AppError("Iconrrect email/password combination", 401);
    }

    const token = sign(
      {
        user: {
          id: userPrisma.id,

          name: userPrisma.name,
          mail: userPrisma.mail,
          registration: userPrisma.registration,
          isStudent: userPrisma.isStudent,
          isProfessor: userPrisma.isProfessor,
          isAcademicCenter: userPrisma.isAcademicCenter,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: userPrisma.id,
        expiresIn: "1d",
      }
    );
    delete userPrisma.password;
    return {
      user: userPrisma,
      token,
    };
  }
}

export { AuthenticateUserService };
