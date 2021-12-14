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
  classId: string;
}

class CreateEventService{
  async execute({title, description, isActive, difficultyLevel, initDate, endDate, professorId, classId}: IRequest){
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
        professorId,
        classId
      }
    });

    if(eventAlreadyExists) throw new AppError("Event already exists");

    const classExists = await prismaClient.class.findUnique({where: {id: classId}});

    if(!classExists){
      throw new AppError("Class assigned to the event does not exist.");
    }

    if(classExists.professorId == professorId){
      throw new AppError("Class assigned to the event does not belong to this teacher.");
    }

    const event = await prismaClient.event.create({data :{
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate,
      professorId,
      classId
    }, include : {professor: true, class : true}})
    return event;
  }
}

export { CreateEventService };
