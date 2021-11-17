import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";
import { Event } from "../../../types/event";

class UpdateEventService{
  async execute(id: string, {title, description, isActive, difficultyLevel, initDate, endDate}: Event){
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id
      }
    });

    if(!eventAlreadyExists) throw new AppError("Event does not exist");

    const event = prismaClient.event.update({
      where: {
        id
      },
      data: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate
      }
    });
    return event
  };
};

export { UpdateEventService };
