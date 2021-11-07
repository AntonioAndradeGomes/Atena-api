import prismaClient from "../../../prisma";
import { Discipline } from "../../../types/discipline";

class CreateDisciplineService{
  async execute({code, name, initials, workload}: Discipline){
    const discipline = await prismaClient.discipline.create({
      data: {
        code,
        name,
        initials,
        workload,
      }}
    );
    return discipline;
  }
}

export { CreateDisciplineService };
