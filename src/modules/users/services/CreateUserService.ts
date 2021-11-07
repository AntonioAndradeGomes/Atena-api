import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  name: string;
  mail: string;
  isStudent: boolean
  isProfessor: boolean
  isAcademicCenter: boolean
  registration: string
  code: string
  caInitDate: string
  caEndDate: string
}


class CreateUserService{
  async execute({name, mail, isStudent, isProfessor, isAcademicCenter, registration, code, caEndDate, caInitDate} : IRequest){
    let user = await prismaClient.user.findFirst({
      where :{
        mail,
      }
    });

    if(user){
      throw new AppError("User already exists", 400);
    }

    if(isStudent && !code){
      throw new AppError("Student needs a code", 400);
    }

    if(isAcademicCenter && (!caInitDate || !caEndDate)){
      throw new AppError("Add academic center student regency", 400);
    }
    
    /* TODO: 
    *a medida que os backend usem pode ser necessario verificar 
    *casos em que o front esta colocando o usaurio como professor aluno e centro academico
    */

    user = await prismaClient.user.create({
      data: {
        name,
        mail,
        isAcademicCenter,
        isProfessor,
        isStudent,
        registration,
        code,
        caEndDate: caEndDate,
        caInitDate: caInitDate,
      }
    });

    return user;
  }
}

export {CreateUserService}
