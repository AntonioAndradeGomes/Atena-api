import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  studentId: string;
  userId: string;
  caEndDate: string | Date;
  caInitDate: string | Date;
}

class StudentJoinCAService {
  async execute({ studentId, userId, caEndDate, caInitDate }: IRequest) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError("User Request not found", 401);
    }

    //verificar se o usuario é que esta adicionando é membro do ca ou admin
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

    //verificar se o user é estudante
    if (!student.roles.includes(Role.STUDENT)) {
      throw new AppError(
        "User to be set as Academic Center is not a Student.",
        400
      );
    }

    //verificar se o user é do centro academico
    if (student.roles.includes(Role.ACADEMIC_CENTER)) {
      throw new AppError("User is already Academic Center.");
    }

    student = await prismaClient.user.update({
      where: { id: userId },
      data: {
        caInitDate: caInitDate,
        caEndDate: caEndDate,
        roles: [Role.STUDENT, Role.ACADEMIC_CENTER],
      },
    });

    delete student.password;
    return student;
  }
}

export { StudentJoinCAService };
