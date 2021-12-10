import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class RetrieveDisciplineService {
  async execute(id: string) {
    const discipline = await prismaClient.discipline.findUnique({
      where: {
        id,
      },
      include: { academicCenter: true },
    });

    if (!discipline) throw new AppError("Discipline does not exist");

    return discipline;
  }
}

export { RetrieveDisciplineService };
