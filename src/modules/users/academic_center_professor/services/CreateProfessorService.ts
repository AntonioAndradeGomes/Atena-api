import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  academicCenterId: string;
  name: string;
  mail: string;
  registration: string;
  password: string;
}

class CreateProfessorService{
  async execute({academicCenterId, name, mail, registration, password} : IRequest){
    let user = await prismaClient.user.findFirst({where: {mail}});
    if(user){
      throw new AppError("User already exists.", 400);
    }


    if(password.length < 6){
      throw new AppError("Password too weak.", 400);
    }

    const hashedPassword = await hash(password, 8);

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
        password: hashedPassword,
        academicCenterId,
      }
    });
    delete user.password;
    return user;
  }
}

export {CreateProfessorService}
