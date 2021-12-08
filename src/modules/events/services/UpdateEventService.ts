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
  id: string;
}

class UpdateEventService {
  async execute({
    id,
    professorId,
    title,
    description,
    isActive,
    difficultyLevel,
    initDate,
    endDate,
  }: IRequest) {
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id,
      },
    });

    if (!eventAlreadyExists) {
      throw new AppError("Event does not exist");
    }
    if (eventAlreadyExists.professorId != professorId) {
      throw new AppError("You are not authorized to do this action.", 401);
    }

    const event = prismaClient.event.update({
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
      },
    });
    return event;
  }
}

export { UpdateEventService };
