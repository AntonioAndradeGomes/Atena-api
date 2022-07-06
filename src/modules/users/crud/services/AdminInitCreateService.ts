import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest{
  jwtsecret: string;
}

class AdminInitCreateService{
  async execute({jwtsecret}: IRequest) {
    const countAdmin = await prismaClient.user.count({where:{
      roles: {has: Role.ADMIN}
    }});
    if(countAdmin != 0){
      throw new AppError("There is already a user of type Admin in the system.");
    }
    if(jwtsecret != process.env.JWT_SECRET){
      throw new AppError("No token needed to create first admin");
    }
    const hashedPassword = await hash('admin', 8);
    const admim = await prismaClient.user.create({
      data: {
        name: 'ADMIN',
        mail: 'admin@admin.com',
        password: hashedPassword,
        roles: [Role.ADMIN],
      }
    });
    delete admim.password;
    return admim;
  }
}

export {AdminInitCreateService};
