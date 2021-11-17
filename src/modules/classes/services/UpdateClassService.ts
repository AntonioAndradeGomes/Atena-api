import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";
import { Class } from "../../../types/class";

class UpdateClassService{
  async execute(id: string, { name, academicYear, period, isRegularClass }: Class){
    const classAlreadyExist = await prismaClient.class.findFirst({
      where: {
        id
      }
    });

    if(!classAlreadyExist) throw new AppError("Object not found");

    const classInstance = await prismaClient.class.update({
      where: {
        id
      },
      data: {
        name,
        academicYear,
        period,
        isRegularClass
      }
    });
    return classInstance;
  }
};

export { UpdateClassService };
