import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class DeleteEventService{
  async execute(id: string){
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id
      }
    });

    if(!eventAlreadyExists) throw new AppError("Event does not exist");

    const event = prismaClient.event.delete({
      where: {
        id
      }
    });
    return event;
  };
};

export { DeleteEventService };
