import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  studentId: string;
  classId:    string;
}


class RemoveStudentToClassService {
  async execute({classId, studentId} : IRequest) {
    const relationExists = await prismaClient.studentOnClasses.findUnique({where: {studentId_classId: {studentId, classId}}});
    if(!relationExists){
      throw new AppError("This student is not in this class.");
    }
    await prismaClient.studentOnClasses.delete({where: {studentId_classId: {studentId, classId}}});
    return {};
  }
}

export {RemoveStudentToClassService}
