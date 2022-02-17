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
    classId,
  }: IRequest) {
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id,
      },
    });

    if (!eventAlreadyExists) {
      throw new AppError("Event does not exist");
    }

    //todo : verificar erros nesse linha abaixo
   /* if (eventAlreadyExists.professorId != professorId) {
      throw new AppError("You are not authorized to do this action.", 401);
    }
*/
    // verificar se a nova turma existe
    const classExist = await prismaClient.class.findUnique({where: {id: classId}});

    if(!classExist){
      throw new AppError("Class assigned to the event does not belong to this teacher.");
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
        classId
      },
    });
    return event;
  }
}

export { UpdateEventService };
