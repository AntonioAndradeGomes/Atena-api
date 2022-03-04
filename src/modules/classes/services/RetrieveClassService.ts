import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class RetrieveClassService {
  async execute(id: string) {
    const classInstance = await prismaClient.class.findUnique({
      where: {
        id,
      },
      include: {
        discipline: true,
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

    if (!classInstance) throw new AppError("Class does not exist");

    return classInstance;
  }
}

export { RetrieveClassService };
