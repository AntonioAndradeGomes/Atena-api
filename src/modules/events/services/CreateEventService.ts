import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";
import { Event } from "../../../types/event";

class CreateEventService{
  async execute({title, description, isActive, difficultyLevel, initDate, endDate}: Event){
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate
      }
    });

    if(eventAlreadyExists) throw new AppError("Event already exists");

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
