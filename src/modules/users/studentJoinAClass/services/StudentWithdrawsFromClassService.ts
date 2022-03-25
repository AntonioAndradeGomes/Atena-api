import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  studentId: string;
  classId:   string;
}


class StudentWithdrawsFromClassService {
  async execute({classId, studentId} : IRequest) {
    const user = await prismaClient.user.findUnique({where: {id: studentId}});

    if(!user.roles.includes(Role.STUDENT) ){
      throw new AppError("User does not have the necessary permission.", 401)
    }

    const relationExists = await prismaClient.studentOnClasses.findUnique({where: {studentId_classId: {studentId, classId}}});

    if(!relationExists){
      throw new AppError("This student is not in this class.");
    }

    await prismaClient.studentOnClasses.delete({where: {studentId_classId: {studentId, classId}}});
    
    return {};
  }
}

export {StudentWithdrawsFromClassService}

