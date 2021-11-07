import prismaClient from "../../../prisma";
import { Discipline } from "../../../types/discipline";

class UpdateDisciplineService{
  async execute(id: string, {code, name, initials, workload}: Discipline){
    const discipline = await prismaClient.discipline.update({
      where: { 
        id 
      },
      data: {
        code,
        name,
        initials,
        workload
      }
    });
    return discipline;
  };
};

export { UpdateDisciplineService };
