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
  professorId: string;
  classId: string;
}

class ProfessorCreateEventService {
  async execute({
    title,
    description,
    isActive,
    difficultyLevel,
    initDate,
    endDate,
    professorId,
    classId,
  }: IRequest) {
    const professor = await prismaClient.user.findUnique({
      where: { id: professorId },
    });

    if (!professor) {
      throw new AppError("Professor not found.", 401);
    }

    if (!professor.roles.includes(Role.PROFESSOR)) {
      throw new AppError("User does not have this permission.", 401);
    }

    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
        classId,
      },
    });

    if (eventAlreadyExists) {
      throw new AppError("Event already exists");
    }

    const classExists = await prismaClient.class.findUnique({
      where: { id: classId },
    });

    if (!classExists) {
      throw new AppError("Class assigned to the event does not exist.");
    }

    if(professor.id != classExists.professorId){
      throw new AppError("Events cannot be registered for classes that do not belong to the teacher who is logged in.");
    }

    const event = await prismaClient.event.create({
      data: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
        professorId: professor.id,
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

export { ProfessorCreateEventService };
