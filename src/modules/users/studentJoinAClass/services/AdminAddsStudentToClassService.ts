import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  studentId: string;
  classId: string;
  adminId: string;
}

class AdminAddsStudentToClassService {
  async execute({ classId, studentId, adminId }: IRequest) {
    const admin = await prismaClient.user.findUnique({where: {id: adminId}});

    if(!admin){
      throw new AppError("Admin not found.", 400);
    }

    if(!admin.roles.includes(Role.ADMIN)){
      throw new AppError("User does not have the necessary permission.", 401);
    }

    const student = await prismaClient.user.findUnique({where: {id: studentId}});

    if(!student.roles.includes(Role.STUDENT) ){
      throw new AppError("User is not a student.", 400)
    }

    let relation = await prismaClient.studentOnClasses.findUnique({
      where: { studentId_classId: { studentId, classId } },
    });

    if (relation) {
      throw new AppError("This student already belongs to that class.");
    }

    const classExist = await prismaClient.class.findUnique({
      where: { id: classId },
    });

    if (!classExist) {
      throw new AppError("This class does not exist.");
    }

    relation = await prismaClient.studentOnClasses.create({
      data: { studentId, classId },
      include: { class: true, student: true },
    });
    
    return relation;
  }
}

export { AdminAddsStudentToClassService };
