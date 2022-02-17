import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import moment from "moment";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest{
  name: string;
  mail: string;
  password: string;
  registration: string;
  code: string; 
}

class CreateUserStudentService{
  async execute({name, mail, registration, code, password } : IRequest){
    
    let userPrisma = await  prismaClient.user.findFirst({
      where : {
        mail,
      }
    });

    if(userPrisma){
      throw new AppError('User already exists', 401);
    }

    const accessCode = await prismaClient.accessCode.findUnique({where: {code}});

    if(!accessCode){
      throw new AppError('Access code does not exist', 401);
    }

    const diff = moment
    .duration(moment(accessCode.expiredAt).diff(moment(new Date())))
    .asDays();


    if(diff < 0){
      await prismaClient.accessCode.delete({where: {id: accessCode.id}});
      throw new AppError('Invalid access code', 401);
    }

    if(password.length < 6){
      throw new AppError("Password too weak.", 400);
    }

    const hashedPassword = await hash(password, 8);
    
    userPrisma = await prismaClient.user.create({
      data: {
        name,
        mail,
        registration,
        code: accessCode.code,
        password: hashedPassword,
        roles: [Role.STUDENT],
      },
    });

    await prismaClient.accessCode.delete({where: {id: accessCode.id}});
    delete userPrisma.password;
    return userPrisma;
  }
}

export { CreateUserStudentService };
