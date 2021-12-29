import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

class RefreshTokenAdminService {
  async execute(id: string) {
    const admin = await prismaClient.admin.findUnique({ where: { id } });
    if (!admin) {
      throw new AppError("Unable to generate token", 401);
    }
    const token = sign(
      {
        user: {
          id: admin.id,
          name: admin.username,
          mail: admin.mail,
          
        },
      },
      process.env.JWT_SECRET,
      {
        subject: admin.id,
        expiresIn: "2d",
      }
    );
    delete admin.password;
    return {
      user: admin,
      token,
    };
  }
}

export { RefreshTokenAdminService };
