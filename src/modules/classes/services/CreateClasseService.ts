import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";
import { Class } from "../../../types/class";

class CreateClassService{
  async execute({name, academicYear, period, isRegularClass}: Class){

    const alreadyClassExists = await prismaClient.class.findFirst({
      where: {
        name,
        academicYear,
        period,
        isRegularClass
      }
    });

    if(alreadyClassExists) throw new AppError("Class already exists");

    const classInstance = await prismaClient.class.create({
      data: {
        name,
        academicYear,
        period,
        isRegularClass
      }
    });
    return classInstance;
  };
};

export { CreateClassService };
