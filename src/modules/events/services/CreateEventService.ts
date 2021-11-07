import prismaClient from "../../../prisma";
import { Event } from "../../../types/event";

class CreateEventService{
  async execute({title, description, isActive, difficultyLevel, initDate, endDate}: Event){
    const event = await prismaClient.event.create({
      data: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
      }}
    );
    return event;
  }
}

export { CreateEventService };
