import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  studentId: string;
  userId: string;
}

class RemoveStudentCAService{
  async execute({ studentId, userId}: IRequest) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError("User Request not found", 401);
    }

    if (
      !user.roles.includes(Role.ADMIN) &&
      !user.roles.includes(Role.ACADEMIC_CENTER)
    ) {
      throw new AppError("User does not have the necessary permission.", 401);
    }

    let student = await prismaClient.user.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new AppError("User Student not found", 400);
    }

    if (!student.roles.includes(Role.STUDENT)) {
      throw new AppError(
        "User to be removed from Academic Center is not a Student.",
        400
      );
    }

    if (!student.roles.includes(Role.ACADEMIC_CENTER)) {
      throw new AppError("The user is not an Academic Center.");
    }

    student = await prismaClient.user.update({
      where: { id: userId },
      data: {
        caInitDate: null,
        caEndDate: null,
        roles: [Role.STUDENT],
      },
    });

    delete student.password;
    return student;
  }
}

export{RemoveStudentCAService}
