import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  id: string;
  userId: string;
}

class AdminDeleteEventService {
  async execute({ id, userId }: IRequest) {
    const admin = await prismaClient.user.findUnique({ where: { id: userId } });

    if (!admin) {
      throw new AppError("User not found.", 401);
    }

    if (
      !admin.roles.includes(Role.ADMIN)  
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

    await prismaClient.event.delete({
      where: {
        id,
      },
    });

    return {};
  }
}

export { AdminDeleteEventService };
