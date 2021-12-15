import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  studentId: string;
  classId:    string;
}


class AddStudentToClassService {
  async execute({classId, studentId} : IRequest) {
    const relationExists = await prismaClient.studentOnClasses.findUnique({where: {studentId_classId: {studentId, classId}}});
    if(relationExists){
      throw new AppError("This student already belongs to that class.");
    }
    const classExist = await prismaClient.class.findUnique({where: {id: classId}});

    if(!classExist){
      throw new AppError("This class does not exist.");
    }

    const relation = await prismaClient.studentOnClasses.create({data: {studentId, classId}, include: {class: true, student: true}});
    return relation;
  }
}

export {AddStudentToClassService}
