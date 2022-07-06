import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  id: string;
  name: string;
  academicYear: string;
  period: string;
  isRegularClass: boolean;
  professorId: string;
  userId: string;
  disciplineId: string;
  dateInitClass: string | Date;
  dateEndClass: string | Date;
}

class UpdateClassService {
  async execute({
    id,
    name,
    academicYear,
    period,
    isRegularClass,
    professorId,
    userId,
    disciplineId,
    dateEndClass,
    dateInitClass,
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

    const classAlreadyExist = await prismaClient.class.findUnique({
      where: {
        id,
      },
    });

    if (!classAlreadyExist) throw new AppError("Class not found");

    const professorAlreadyExists = await prismaClient.user.findUnique({
      where: { id: professorId },
    });

    if (!professorAlreadyExists) {
      throw new AppError("Professor doesn't exist");
    }

    const disciplineAlreadyExists = await prismaClient.discipline.findUnique({
      where: { id: disciplineId },
    });

    if (!disciplineAlreadyExists) {
      throw new AppError("Discipline doesn't exist");
    }

    const classInstance = await prismaClient.class.update({
      where: {
        id,
      },
      data: {
        name,
        academicYear,
        period,
        isRegularClass,
        disciplineId,
        dateEndClass,
        dateInitClass,
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

export { UpdateClassService };
