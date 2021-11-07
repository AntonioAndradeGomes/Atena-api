import prismaClient from "../../../prisma";
import { Event } from "../../../types/event";

class UpdateEventService{
  async execute(id: string, {title, description, isActive, difficultyLevel, initDate, endDate}: Event){
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
