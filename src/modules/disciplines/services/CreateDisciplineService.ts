import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";


interface IRequest{
  code : string;
  name : string;
  initials: string;
  courseLoad: number;
  academicCenterId: string;
}

class CreateDisciplineService{
  async execute({code, name, initials, courseLoad, academicCenterId}: IRequest){
    const disciplineAlreadyExists = await prismaClient.discipline.findFirst({
      where: {
        code,
        name,
        initials,
        courseLoad
      }
    });

    if(disciplineAlreadyExists) throw new AppError("Discipline already exists");

    const discipline = await prismaClient.discipline.create({
      data: {
        code,
        name,
        initials,
        courseLoad,
       
      },
    
    }
    );
    return discipline;
  }
}

export { CreateDisciplineService };
