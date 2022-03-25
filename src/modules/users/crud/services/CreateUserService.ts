import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest{
  adminId : string;
  name: string;
  mail: string;
  role: string;
  registration: string | null;
  caInitDate: string | null;
  caEndDate: string | null;
  password: string;
}


class CreateUserService{
  async execute({adminId, name, mail, registration, caEndDate, caInitDate, password, role } : IRequest){
    //verificar se o id é de um admin
    const admin = await prismaClient.user.findUnique({where:{id: adminId}});
    
    if(!admin ){
      throw new AppError('User not found.', 401);
    }
    
    if( !admin.roles.includes(Role.ADMIN)){
      throw new AppError('User does not have this permission', 401);
    }

    //verificar se o usuario já existe
    let user = await prismaClient.user.findFirst({
      where :{
        mail,
      }
    });

    if(user){
      throw new AppError("User already exists.", 400);
    }

    //verificar se o role passado é válido
    const roleExists = ["ADMIN", "STUDENT", "PROFESSOR","ACADEMIC_CENTER"].find(
      (element) => element == role.toUpperCase()
    );

    if(!roleExists){
      throw new AppError("Pass a valid permission.");
    }

    //transformar numa lista de roles
    let roleFinal = [Role[role.toUpperCase()]];
    //se o role passado for de um CA verificar se os dados de data foi passado
    if(roleFinal[0] == Role.ACADEMIC_CENTER && (!caInitDate || !caEndDate)){
      throw new AppError("Add academic center student regency.", 400);
    }
    //se o role passado for de um CA passar a ele permissões de estudante
    if(roleFinal[0] == Role.ACADEMIC_CENTER){
      roleFinal.push(Role.STUDENT);
    }
    //senha fraca
    if(password.length < 6){
      throw new AppError("Password too weak.", 400);
    }
    //criptografar a senha
    const hashedPassword = await hash(password, 8);
    //retorno
    user = await prismaClient.user.create({
      data: {
        name,
        mail,
        roles: roleFinal,
        registration,
        caEndDate: caEndDate,
        caInitDate: caInitDate,
        password: hashedPassword,
      },
    });
    //TODO: enviar um email falando para o usuario qual sua senha e mandando ele editá-lá
    delete user.password;
    return user;
  }
}

export {CreateUserService};
