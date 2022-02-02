import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

class DeleteAdminService{
  async execute(id: string){
    const admin = await prismaClient.admin.findUnique({where: {id}});

    if(!admin){
      throw new AppError('Admin does not exist');
    }

    await prismaClient.admin.delete({where: {id}});

    return {};
  }
}

export {DeleteAdminService}
