import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class RetrieveClassService {
  async execute(id: string) {
    const classInstance = await prismaClient.class.findUnique({
      where: {
        id,
      },
      include: {  discipline: true },
    });

    if (!classInstance) throw new AppError("Class does not exist");

    return classInstance;
  }
}

export { RetrieveClassService };
