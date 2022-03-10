import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class RetrieveEventService {
  async execute(id: string) {
    const event = await prismaClient.event.findUnique({
      where: {
        id,
      },
      include: {
        class: true,
        professor: {
          select: {
            password: false,
            id: true,
            name: true,
            mail: true,
            roles: true,
            registration: true,
            code: true,
            caInitDate: true,
            caEndDate: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!event) {
      throw new AppError("Event does not exist.");
    }

    return event;
  }
}

export { RetrieveEventService };
