import prismaClient from "../../../prisma";

class AllDisciplineService{
  async execute(){
    const disciplines = await prismaClient.discipline.findMany();
    return disciplines;
  };
};

export { AllDisciplineService };
