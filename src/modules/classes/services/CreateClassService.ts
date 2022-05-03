import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  name: string;
  academicYear: string;
  period: string;
  isRegularClass: boolean;
  professorId: string;
  userId: string;
  disciplineId: string;
}

class CreateClassService {
  async execute({
    name,
    academicYear,
    period,
    isRegularClass,
    professorId,
    userId,
    disciplineId,
  }: IRequest) {
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

    const classAlreadyExists = await prismaClient.class.findFirst({
      where: {
        name,
        academicYear,
        period,
        isRegularClass,
      },
    });

    if (classAlreadyExists) {
      throw new AppError("Class already exists");
    }

    const professorAlreadyExists = await prismaClient.user.findUnique({
      where: { id: professorId },
    });

    if (!professorAlreadyExists) {
      throw new AppError("Professor doesn't exist");
    }

    if(!professorAlreadyExists.roles.includes(Role.PROFESSOR)){
      throw new AppError("Professor doesn't exist");
    }

    const disciplineAlreadyExists = await prismaClient.discipline.findUnique({
      where: { id: disciplineId },
    });

    if (!disciplineAlreadyExists) {
      throw new AppError("Discipline doesn't exist");
    }

    const classInstance = await prismaClient.class.create({
      data: {
        name,
        academicYear,
        period,
        isRegularClass,
        professorId,
        disciplineId,
        academicCenterId: userRequest.roles.includes(Role.ACADEMIC_CENTER)
          ? userRequest.id
          : null,
      },
      include: {
        discipline: true,
        professor: {
          select: {
            password: false,
            id: true,
            name: true,
            mail: true,
            roles: true,
            registration: true,
            code: true,
            caInitDate: true,
            caEndDate: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return classInstance;
  }
}

export { CreateClassService };
