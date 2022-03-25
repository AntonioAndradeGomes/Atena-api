import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  code: string;
  name: string;
  initials: string;
  courseLoad: number;
  userId: string;
  id: string;
}

class UpdateDisciplineService {
  async execute({
    id,
    code,
    name,
    initials,
    courseLoad,
    userId,
  }: IRequest) {
    //verificar usuario
    const userRequest = await prismaClient.user.findUnique({where: {id: userId}});

    if(!userRequest){
      throw new AppError("User not found", 401);
    }
    //verificar se o user é ca ou admin
    if(!userRequest.roles.includes(Role.ACADEMIC_CENTER) && !userRequest.roles.includes(Role.ADMIN)){
      throw new AppError("User does not have this permission.", 401);
    }

    const disciplineAlreadyExists = await prismaClient.discipline.findUnique({
      where: {
        id,
      },
    });

    if (!disciplineAlreadyExists) {
      throw new AppError("Discipline does not exist");
    }

    const discipline = await prismaClient.discipline.update({
      where: {
        id,
      },
      data: {
        code,
        name,
        initials,
        courseLoad,
      },
    });
    
    return discipline;
  }
}

export { UpdateDisciplineService };
