

//o centro academico atualizar dados do professor

import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  id: string;
  name: string;
  registration: string;
  academicCenterId: string;
  password: string | null;
}

class UpdateProfessorService{
  
  async execute({id, name, registration, academicCenterId, password} : IRequest) {
    
    const user = await prismaClient.user.findUnique({where : {id}});

    if(!user){
      throw new AppError("Professor doesn't exist", 400);
    }

    if(!user.isProfessor){
      throw new AppError("User is not a Professor", 401);
    }

    if(password) {
      if(password.length < 6){
        throw new AppError("Password too weak.", 400);
      }else{
        const hashedPassword = await hash(password, 8);
        const userUp = await prismaClient.user.update({where: {id}, data: {registration, name, password: hashedPassword, academicCenterId},});
        delete userUp.password;
        return userUp;
      }
    }else{
      const userUp = await prismaClient.user.update({where: {id}, data: {registration, name, academicCenterId},});
      delete userUp.password;
      return userUp;
    }
  }

}

export {UpdateProfessorService}
