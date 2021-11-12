import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class DeleteDisciplineService{
  async execute(id: string){
    const disciplineAlreadyExists = await prismaClient.discipline.findFirst({
      where: {
        id
      }
    });

    if(!disciplineAlreadyExists) throw new AppError("Discipline does not exist");
    
    const discipline = await prismaClient.discipline.delete({
      where: { 
        id
      }
    });
    return discipline;
  };
};

export { DeleteDisciplineService };
