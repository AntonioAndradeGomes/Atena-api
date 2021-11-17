import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";
import { Discipline } from "../../../types/discipline";

class UpdateDisciplineService{
  async execute(id: string, {code, name, initials, workload}: Discipline){
    const disciplineAlreadyExists = await prismaClient.discipline.findFirst({
      where: {
        id
      }
    });

    if(!disciplineAlreadyExists) throw new AppError("Discipline does not exist");
    
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
