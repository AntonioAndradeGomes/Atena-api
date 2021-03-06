import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

class RefreshTokenService {
  async execute(id: string) {
    const user = await prismaClient.user.findUnique({ where: { id } });
    if (!user) {
      throw new AppError("Unable to generate token", 401);
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
        expiresIn: "2d",
      }
    );
    delete user.password;
    return {
      user: user,
      token,
    };
  }
}

export { RefreshTokenService };
