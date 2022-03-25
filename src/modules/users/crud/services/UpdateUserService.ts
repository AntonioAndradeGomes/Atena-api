
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  userId: string;
  name: string;
  mail: string;
  registration: string;
}

class UpdateUserService{
  async execute({userId, name, mail, registration} : IRequest){
    let user = await prismaClient.user.findUnique({where:{id: userId}});
    if(!user){
      throw new AppError("User not found");
    }
    user = await prismaClient.user.update({where: {id: userId,}, data: {name, registration,}})
  }
}

export {UpdateUserService};
