import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IStudent {
  mail: string
}

class StudentJoinAcademicCenterService {
  async execute({mail}: IStudent) {
    const studentAlreadyExists = await prismaClient.user.findUnique({
      where: {
        mail
      } 
    });

    if(!studentAlreadyExists) throw new AppError("Student whit this email does not exist", 400);

    const studentUpdated = await prismaClient.user.update({
      where: {
        mail
      },
      data: {
        isAcademicCenter: true
      }
    });

    return studentUpdated;
  }
};

export {StudentJoinAcademicCenterService};
