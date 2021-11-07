import prismaClient from "../../../prisma";
import { Class } from "../../../types/class";

class UpdateClassService{
  async execute(id: string, { name, academicYear, period }: Class){
    const classInstance = await prismaClient.class.update({
      where: {
        id
      },
      data: {
        name,
        academicYear,
        period
      }
    });
    return classInstance;
  }
};

export { UpdateClassService };
