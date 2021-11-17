import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class RetrieveEventService{
  async execute(id: string){
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id
      }
    });

    if(!eventAlreadyExists) throw new AppError("Event does not exist");

    const event = await prismaClient.event.findUnique({
      where: {
        id
      }
    });
    return event;
  };
};

export { RetrieveEventService };
