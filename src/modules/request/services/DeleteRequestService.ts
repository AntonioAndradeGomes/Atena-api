import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class DeleteRequestService {
  async execute(id: string) {
    const request = await prismaClient.request.findUnique({ where: { id } });
    if (!request) {
      throw new AppError("Request not found");
    }
    await prismaClient.request.delete({ where: { id } });
    return {};
  }
}

export { DeleteRequestService };
