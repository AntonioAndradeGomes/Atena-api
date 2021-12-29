import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

class DeleteProfessorService{

  async execute(id: string){
    let user = await prismaClient.user.findUnique({where : {id}});

    if(!user){
      throw new AppError("Professor doesn't exist", 400);
    }

    if(!user.isProfessor){
      throw new AppError("Professor doesn't exist", 401);
    }

    await prismaClient.user.delete({where: {id}});
    
    return {message: "User deleted successfully"};
  }
}

export {DeleteProfessorService}
