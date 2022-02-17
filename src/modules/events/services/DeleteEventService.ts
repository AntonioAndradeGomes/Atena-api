import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class DeleteEventService{
  async execute(id: string, professorId : string){
    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id
      }
    });

    if (!eventAlreadyExists) {
      throw new AppError("Event does not exist");
    }
    /*if (eventAlreadyExists.professorId != professorId) {
      throw new AppError("You are not authorized to do this action.", 401);
    }*/


    const event = prismaClient.event.delete({
      where: {
        id
      }
    });
    return {
      message: "Event deleted successfully"
    };
  };
};

export { DeleteEventService };
