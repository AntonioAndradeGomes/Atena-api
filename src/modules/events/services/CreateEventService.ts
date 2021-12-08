import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";


interface IRequest{
  title: string;
  description: string;
  isActive: boolean;
  difficultyLevel: number;
  initDate: string|Date;
  endDate: string|Date;
  professorId: string;
}

class CreateEventService{
  async execute({title, description, isActive, difficultyLevel, initDate, endDate, professorId}: IRequest){
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
        professorId
      }
    });

    if(eventAlreadyExists) throw new AppError("Event already exists");

    const event = await prismaClient.event.create({data :{
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate,
      professorId
    }, include : {professor: true,}})
    return event;
  }
}

export { CreateEventService };
