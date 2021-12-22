import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  id: string;
  username: string;
  mail: string;
  password: string | null;
}

class UpdateAdminService {
  async execute({ id, username, mail, password }: IRequest) {
    const admin = await prismaClient.admin.findUnique({ where: { id } });

    if (!admin) {
      throw new AppError("Admin does not exist");
    }

    if (password) {
      if (password.length < 6) {
        throw new AppError("Admin does not exist");
      } else {
        const hashedPassword = await hash(password, 8);
        const adminUp = await prismaClient.admin.update({
          where: { id },
          data: { mail, username, password: hashedPassword },
        });
        delete adminUp.password;
        return adminUp;
      }
    } else {
      const adminUp = await prismaClient.admin.update({
        where: { id },
        data: { mail, username },
      });
      delete adminUp.password;
      return adminUp;
    }
  }
}

export { UpdateAdminService };
