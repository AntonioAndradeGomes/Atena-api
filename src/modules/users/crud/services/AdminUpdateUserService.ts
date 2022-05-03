
import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  adminId: string;
  userId: string;
  name: string;
  role: string;
  registration: string | null;
  caInitDate: string | null;
  caEndDate: string | null;
}

class AdminUpdateUserService{
  async execute({adminId,  userId, name, role, registration, caInitDate, caEndDate} : IRequest){
    const admin = await prismaClient.user.findUnique({where: {id: adminId}});
    if(!admin){
      throw new AppError("Admin not found", 401);
    }

    if(!admin.roles.includes(Role.ADMIN)){
      throw new AppError('User does not have this permission', 401);
    }

    let user = await prismaClient.user.findUnique({where: {id: userId}});

    if(!user){
      throw new AppError("User not found", 400);
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

    //se o role passado não for admin, verificar o codigo de registro
    if(!roleFinal.includes(Role.ADMIN)){
      if(!registration){
        throw new AppError("User needs registration");
      }
      user = await prismaClient.user.findFirst({where: {registration}});
      if(user){
        throw new AppError("There is already a user with this record");
      }
    }
    user = await prismaClient.user.update({where: {id: userId}, data: {name, roles: roleFinal, registration, caInitDate, caEndDate,}});
    delete user.password;
    return user;
  }
}

export {AdminUpdateUserService};
