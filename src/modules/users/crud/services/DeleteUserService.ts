import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  userId: string;
}

class DeleteUserService{
  async execute({userId} : IRequest){
    const user = await prismaClient.user.findUnique({where: {id: userId}});

    if(!user){
      throw new AppError("User does not exist.");
    }

    await prismaClient.user.delete({where: {id: userId}});
    return {};
  }
}

export {DeleteUserService};
