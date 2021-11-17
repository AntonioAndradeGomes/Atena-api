import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class RetrieveDisciplineService{
  async execute(id: string){
    const disciplineAlreadyExists = await prismaClient.discipline.findFirst({
      where: {
        id
      }
    });

    if(!disciplineAlreadyExists) throw new AppError("Discipline does not exist");
    
    const discipline = await prismaClient.discipline.findUnique({
      where: {
        id
      }
    });
    return discipline;
  };
};

export { RetrieveDisciplineService };
