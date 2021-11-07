import prismaClient from "../../../prisma";
import { Class } from "../../../types/class";

class CreateClassService{
  async execute({name, academicYear, period}: Class){
    const classInstance = await prismaClient.class.create({
      data: {
        name,
        academicYear,
        period
      }
    });
    return classInstance;
  };
};

export { CreateClassService };
