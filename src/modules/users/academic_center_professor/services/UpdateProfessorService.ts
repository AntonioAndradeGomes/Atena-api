

//o centro academico atualizar dados do professor

import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  id: string;
  name: string;
  mail: string;
  registration: string;
  academicCenterId: string;
}

class UpdateProfessorService{
  
  async execute({id, name, mail, registration, academicCenterId} : IRequest) {
    
    let user = await prismaClient.user.findUnique({where : {id}});

    if(!user){
      throw new AppError("Professor doesn't exist", 400);
    }

    if(!user.isProfessor){
      throw new AppError("User is not a Professor", 401);
    }

    user = await prismaClient.user.update({where: {id},data: {name, mail, registration, academicCenterId}, include: {academicCenter: true}});

    return user;
  }

}

export {UpdateProfessorService}
