import prismaClient from "../../../prisma";

class AllDisciplineService {
  async execute() {
    const disciplines = await prismaClient.discipline.findMany({
      include: { academicCenter: true },
    });
    return disciplines;
  }
}

export { AllDisciplineService };
