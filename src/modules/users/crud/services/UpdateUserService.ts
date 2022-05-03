import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest{
  userId: string;
  name: string;
}

class UpdateUserService{
  async execute({userId, name}: IRequest) {
    let user = await prismaClient.user.findUnique({where: {id: userId}});
    if(!user){
      throw new AppError("User not found", 401);
    }

    user = await prismaClient.user.update({where: {id: userId}, data: {name,}});
    delete user.password;
    return user;
  }
}

export {UpdateUserService};
