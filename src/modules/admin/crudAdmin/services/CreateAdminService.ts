import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  username: string;
  mail: string;
  password: string;
}

class CreateAdminService {
  async execute({ username, mail, password }: IRequest) {
    let admin = await prismaClient.admin.findFirst({
      where: { OR: [{ mail }, { username }] },
    });
    if (admin) {
      throw new AppError("There is already admin with this data.");
    }
    if (password.length < 6) {
      throw new AppError("Weak password");
    }

    const hashedPassword = await hash(password, 8);

    admin = await prismaClient.admin.create({
      data: { mail, username, password: hashedPassword },
    });

    delete admin.password;

    return admin;
  }
}

export { CreateAdminService };
