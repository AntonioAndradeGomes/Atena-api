import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  id: string;
  name: string;
  academicYear: string;
  period: string;
  isRegularClass: boolean;
  professorId: string;
  academicCenterId: string;
  disciplineId: string;
}


class UpdateClassService{
  async execute({id, name, academicYear, period, isRegularClass, professorId, academicCenterId, disciplineId}: IRequest){
    const classAlreadyExist = await prismaClient.class.findUnique({
      where: {
        id
      }
    });

    if(!classAlreadyExist) throw new AppError("Object not found");

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

    const classInstance = await prismaClient.class.update({
      where: {
        id
      },
      data: {
        name,
        academicYear,
        period,
        isRegularClass,
        
        
        disciplineId
      },
      include: { discipline: true,}
    });
    return classInstance;
  }
};

export { UpdateClassService };
