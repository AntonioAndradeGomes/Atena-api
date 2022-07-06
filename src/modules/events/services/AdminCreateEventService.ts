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
  classId: string;
  userId: string;
}

class AdminCreateEventService {
  async execute({
    title,
    description,
    isActive,
    difficultyLevel,
    initDate,
    endDate,
    userId,
    classId,
  }: IRequest) {
    const admin = await prismaClient.user.findUnique({
      where: {id: userId,}
    });

    if(!admin){
      throw new AppError("Admin not found", 401);
    }

    if (!admin.roles.includes(Role.ADMIN)) {
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

    const event = await prismaClient.event.create({
      data: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
        professorId: classExists.professorId,
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

export { AdminCreateEventService };
