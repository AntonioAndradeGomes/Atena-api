import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest{
  id: string;
  name: string;
  isStudent: boolean;
  isProfessor: boolean;
  isAcademicCenter: boolean;
  registration: string;
  code : string;
  caInitDate: string;
  caEndDate: string;
  password: string | null;
}

class UpdateAllDataUserService{
  async execute({id, name, isStudent, isAcademicCenter, isProfessor, registration, code, caEndDate, caInitDate, password} : IRequest){

    const user = prismaClient.user.findUnique({where: {id}});

    if(!user){
      throw new AppError('User does not exist');
    }

    if(isStudent && isProfessor && isAcademicCenter){
      throw new AppError('Usuário não pode ter os três tipos', 400);
    }

    if(isStudent && !code){
      throw new AppError("Student needs a code", 400);
    }

    if(isAcademicCenter && (!caInitDate || !caEndDate)){
      throw new AppError("Add academic center student regency", 400);
    }
    
    if(password) {
      if(password.length < 6){
        throw new AppError("Password too weak.", 400);
      }else{
        const hashedPassword = await hash(password, 8);
        const userUp = await prismaClient.user.update({where: {id}, data: {registration, name, password: hashedPassword},});
        delete userUp.password;
        return userUp;
      }
    }else{
      const userUp = await prismaClient.user.update({where: {id}, data: {registration, name},});
      delete userUp.password;
      return userUp;
    }
  }
}

export {UpdateAllDataUserService}
