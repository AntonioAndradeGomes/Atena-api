import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  id: string;
  name: string;
  mail: string;
  isStudent: boolean;
  isProfessor: boolean;
  isAcademicCenter: boolean;
  registration: string;
  code : string;
  caInitDate: string;
  caEndDate: string;
}

class UpdateAllDataUserService{
  async execute({id, name, mail, isStudent, isAcademicCenter, isProfessor, registration, code, caEndDate, caInitDate} : IRequest){

    let user = prismaClient.user.findUnique({where: {id}});

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

    user = prismaClient.user.update({where: {id}, data: {
      name,
      mail,
      isStudent,
      isAcademicCenter,
      isProfessor,
      registration,
      googleId: null,
      code,
      caInitDate,
      caEndDate,
    }});

    return user;
  }
}

export {UpdateAllDataUserService}
