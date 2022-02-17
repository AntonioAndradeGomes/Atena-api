import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class RetrieveEventService {
  async execute(id: string) {
    const event = await prismaClient.event.findUnique({
      where: {
        id,
      },
      include: { class: true,}
    });

    if (!event) throw new AppError("Event does not exist.");

    return event;
  }
}

export { RetrieveEventService };
