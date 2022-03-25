import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  idUser: string;
  idDiscipline: string;
}

class DeleteDisciplineService{
  async execute({idUser, idDiscipline} : IRequest){
    const user = await prismaClient.user.findUnique({where: {id: idUser}});
    if(!user){
      throw new AppError("User not found.", 401);
    }
    //verificar se o user é ca ou admin
    if(!user.roles.includes(Role.ACADEMIC_CENTER) && !user.roles.includes(Role.ADMIN)){
      throw new AppError("User does not have this permission.", 401);
    }

    
    const disciplineAlreadyExists = await prismaClient.discipline.findFirst({
      where: {
        id: idDiscipline
      }
    });

    if(!disciplineAlreadyExists) throw new AppError("Discipline does not exist");
    
    await prismaClient.discipline.delete({
      where: { 
        id: idDiscipline
      }
    });
    return {};
  };
};

export { DeleteDisciplineService };
