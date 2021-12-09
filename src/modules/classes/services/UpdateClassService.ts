import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  id: string;
  name: string;
  academicYear: string;
  period: string;
  isRegularClass: boolean;
  professorId: string;
}


class UpdateClassService{
  async execute({id, name, academicYear, period, isRegularClass, professorId }: IRequest){
    const classAlreadyExist = await prismaClient.class.findFirst({
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

    const classInstance = await prismaClient.class.update({
      where: {
        id
      },
      data: {
        name,
        academicYear,
        period,
        isRegularClass,
        professorId,
      },
      include: {professor  : true, academicCenter:true,}
    });
    return classInstance;
  }
};

export { UpdateClassService };
