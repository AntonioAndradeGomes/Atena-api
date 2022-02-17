import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  code: string;
  name: string;
  initials: string;
  courseLoad: number;
  academicCenterId: string;
  id: string;
}

class UpdateDisciplineService {
  async execute({
    id,
    code,
    name,
    initials,
    courseLoad,
    academicCenterId,
  }: IRequest) {
    const disciplineAlreadyExists = await prismaClient.discipline.findUnique({
      where: {
        id,
      },
    });

    if (!disciplineAlreadyExists) {
      throw new AppError("Discipline does not exist");
    }

    const discipline = await prismaClient.discipline.update({
      where: {
        id,
      },
      data: {
        code,
        name,
        initials,
        courseLoad,
   
      },
    });
    return discipline;
  }
}

export { UpdateDisciplineService };
