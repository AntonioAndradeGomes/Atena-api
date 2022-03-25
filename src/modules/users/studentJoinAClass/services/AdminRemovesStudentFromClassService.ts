import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";
interface IRequest{
  studentId: string;
  classId:   string;
  adminId:   string;
}


class AdminRemovesStudentFromClassService{
  async execute({classId, studentId, adminId} : IRequest) {
    const admin = await prismaClient.user.findUnique({where: {id: adminId}});

    if(!admin.roles.includes(Role.ADMIN)){
      throw new AppError("User does not have the necessary permission.", 401);
    }


    const relationExists = await prismaClient.studentOnClasses.findUnique({where: {studentId_classId: {studentId, classId}}});

    if(!relationExists){
      throw new AppError("This student is not in this class.");
    }

    await prismaClient.studentOnClasses.delete({where: {studentId_classId: {studentId, classId}}});
    
    return {};
  }
}

export {AdminRemovesStudentFromClassService}
