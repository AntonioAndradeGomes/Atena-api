import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  studentId: string;
  classId:   string;
}

class StudentJoinsTheClassSerivice {
  async execute({ classId, studentId }: IRequest) {

    const user = await prismaClient.user.findUnique({where: {id: studentId}});

    if(!user){
      throw new AppError("Student not found.", 400);
    }

    if(!user.roles.includes(Role.STUDENT) ){
      throw new AppError("User does not have the necessary permission.", 401);
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

export { StudentJoinsTheClassSerivice };
