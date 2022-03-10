import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  id: string;
  userId: string;
}

class ProfessorDeleteEventService {
  async execute({ id, userId }: IRequest) {
    const professor = await prismaClient.user.findUnique({ where: { id: userId } });

    if (!professor) {
      throw new AppError("User not found.", 401);
    }

    if (
      !professor.roles.includes(Role.PROFESSOR)
      
    ) {
      throw new AppError("User does not have this permission.", 401);
    }

    const eventAlreadyExists = await prismaClient.event.findFirst({
      where: {
        id,
      },
    });

    if (!eventAlreadyExists) {
      throw new AppError("Event does not exist");
    }

    if(eventAlreadyExists.professorId != professor.id){
      throw new AppError("Event does not belong to that Professor.");
    }

    await prismaClient.event.delete({
      where: {
        id,
      },
    });

    return {};
  }
}

export { ProfessorDeleteEventService };
