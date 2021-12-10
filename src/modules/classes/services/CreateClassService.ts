import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  name: string;
  academicYear: string;
  period: string;
  isRegularClass: boolean;
  professorId: string;
  academicCenterId: string | null;
  disciplineId: string;
}

class CreateClassService {
  async execute({
    name,
    academicYear,
    period,
    isRegularClass,
    professorId,
    academicCenterId,
    disciplineId
  }: IRequest) {
    const classAlreadyExists = await prismaClient.class.findFirst({
      where: {
        name,
        academicYear,
        period,
        isRegularClass,
        professorId,
      },
    });

    if (classAlreadyExists) {
      throw new AppError("Class already exists");
    }

    const professorAlreadyExists = await prismaClient.user.findUnique({
      where: { id: professorId },
    });

    if (!professorAlreadyExists) {
      throw new AppError("Professor doesn't exist");
    }

    const disciplineAlreadyExists = await prismaClient.discipline.findUnique({where: {id: disciplineId}});

    if(!disciplineAlreadyExists){
      throw new AppError("Discipline doesn't exist");
    }


    const classInstance = await prismaClient.class.create({
      data: {
        name,
        academicYear,
        period,
        isRegularClass,
        professorId,
        academicCenterId,
        disciplineId
      },
      include: { professor: true, academicCenter: true, discipline: true },
    });
    return classInstance;
  }
}

export { CreateClassService };
