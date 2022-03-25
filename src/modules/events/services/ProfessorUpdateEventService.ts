import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  title: string;
  description: string;
  isActive: boolean;
  difficultyLevel: number;
  initDate: string | Date;
  endDate: string | Date;
  userId: string;
  classId: string;
  id: string;
}

class ProfessorUpdateEventService {
  async execute({
    id,
    userId,
    title,
    description,
    isActive,
    difficultyLevel,
    initDate,
    endDate,
    classId,
  }: IRequest) {
    const professor = await prismaClient.user.findUnique({ where: { id: userId } });

    if (!professor) {
      throw new AppError("User not found.", 401);
    }

    if (
      !professor.roles.includes(Role.PROFESSOR)
    ) {
      throw new AppError("User does not have this permission.", 401);
    }

    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id,
      },
    });

    if (!eventAlreadyExists) {
      throw new AppError("Event does not exist");
    }

    if(eventAlreadyExists.professorId != professor.id){
      throw new AppError("Event does not belong to that Professor.");
    }

    // verificar se a nova turma existe
    const classExist = await prismaClient.class.findUnique({
      where: { id: classId },
    });

    if (!classExist) {
      throw new AppError(
        "Class assigned to the event does not belong to this teacher."
      );
    }

  
    const event = await prismaClient.event.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
        classId,
      },
      include: {
        class: true,
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

    return event;
  }
}

export { ProfessorUpdateEventService };
