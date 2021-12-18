import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";


class DeleteUserService{
  async execute(id: string){
    const user = await prismaClient.user.findUnique({where: {id}});
    if(!user){
      throw new AppError('User does not exist');
    }
    await prismaClient.user.delete({where: {id}});
    
    return {message: "User deleted successfully"};
  }
}

export {DeleteUserService};
