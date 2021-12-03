import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  academicCenterId: string;
  name: string;
  mail: string;
  registration: string;
}

class CreateProfessorService{
  async execute({academicCenterId, name, mail, registration} : IRequest){
    let user = await prismaClient.user.findFirst({where: {mail}});
    if(user){
      throw new AppError("User already exists.", 400);
    }

    user = await prismaClient.user.create({
      data: {
        name,
        mail,
        isAcademicCenter : false,
        isProfessor: true,
        isStudent: false,
        registration,
        code : null,
        caInitDate: null,
        caEndDate: null,
        academicCenterId,
      }
    });
    return user;
  }
}

export {CreateProfessorService}
