import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  mail: string;
  password: string;
}

class AuthenticationService{
  async execute({mail, password} : IRequest){
    const user = await prismaClient.user.findUnique({where: {mail}});
    if(!user){
      throw new AppError("Iconrrect email/password combination", 401);
    }
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Iconrrect email/password combination", 401);
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          mail: user.mail,
          roles: user.roles,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      },
    );
    delete user.password;
    return {
      user,
      token,
    };
  }
}

export{AuthenticationService}
