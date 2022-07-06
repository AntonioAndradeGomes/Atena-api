import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  code: string;
  name: string;
  initials: string;
  courseLoad: number;
  userId: string;
}

class CreateDisciplineService {
  async execute({ code, name, initials, courseLoad, userId }: IRequest) {
    //verificar usuario
    const userRequest = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!userRequest) {
      throw new AppError("User not found", 401);
    }
    //verificar se o user é ca ou admin
    if (
      !userRequest.roles.includes(Role.ACADEMIC_CENTER) &&
      !userRequest.roles.includes(Role.ADMIN)
    ) {
      throw new AppError("User does not have this permission.", 401);
    }

    const disciplineAlreadyExists = await prismaClient.discipline.findFirst({
      where: {
        code,
        name,
        initials,
        courseLoad,
      },
    });

    if (disciplineAlreadyExists)
      throw new AppError("Discipline already exists");

    const discipline = await prismaClient.discipline.create({
      data: {
        code,
        name,
        initials,
        courseLoad,
        academicCenterId: userRequest.roles.includes(Role.ACADEMIC_CENTER)
          ? userRequest.id
          : null,
      },
    });
    return discipline;
  }
}

export { CreateDisciplineService };
