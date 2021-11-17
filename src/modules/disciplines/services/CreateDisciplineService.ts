import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";
import { Discipline } from "../../../types/discipline";

class CreateDisciplineService{
  async execute({code, name, initials, workload}: Discipline){
    const disciplineAlreadyExists = await prismaClient.discipline.findFirst({
      where: {
        code,
        name,
        initials,
        workload
      }
    });

    if(disciplineAlreadyExists) throw new AppError("Discipline already exists");

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
