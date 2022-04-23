import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class DeleteTaskService {
  async execute(id: string) {
    const request = await prismaClient.task.findUnique({ where: { id } });
    if (!request) {
      throw new AppError("Request not found");
    }
    await prismaClient.task.delete({ where: { id } });
    return {};
  }
}

export { DeleteTaskService };
