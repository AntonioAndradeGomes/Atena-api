import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class DeleteClassService{
  async execute(id: string){
    const classAlreadyExist = await prismaClient.class.findFirst({
      where: {
        id
      }
    });

    if(!classAlreadyExist) throw new AppError("Class does not exist");

    const classInstance = await prismaClient.class.delete({
      where: {
        id
      }
    });
    
    return {message: "Successfully deleted class"};
  };
};

export { DeleteClassService };
