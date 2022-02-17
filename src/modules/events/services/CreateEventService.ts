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
 
        classId
      }
    });

    if(eventAlreadyExists) throw new AppError("Event already exists");

    const classExists = await prismaClient.class.findUnique({where: {id: classId}});

    if(!classExists){
      throw new AppError("Class assigned to the event does not exist.");
    }

   
    const event = await prismaClient.event.create({data :{
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate,
      
      classId
    }, include : {class : true}})
    return event;
  }
}

export { CreateEventService };
