import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  mail: string;
  password: string;
}

class AuthAdminService {
  async execute({ mail, password }: IRequest) {
    let admin = await prismaClient.admin.findFirst({
      where: {
        mail,
      },
    });

    if (!admin) {
      throw new AppError("Iconrrect email/password combination", 401);
    }

    const passwordConfirmed = await compare(password, admin.password);

    if (!passwordConfirmed) {
      throw new AppError("Iconrrect email/password combination", 401);
    }

    const token = sign(
      {
        user: {
          id: admin.id,
          username: admin.username,
          mail: admin.mail
        },
      },
      process.env.JWT_SECRET_ADMIN,
      {
        subject: admin.id,
        expiresIn: "1d",
      }
    );
    delete admin.password;
    return {
      user: admin,
      token,
    };
  }
}

export { AuthAdminService };
