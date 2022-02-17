import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  idUser: string;
  name: string;
  mail: string;
  password: string;
  registration: string;
}

class CreateProfessorService {
  async execute({ idUser, name, mail, password, registration }: IRequest) {
    const userRequest = await prismaClient.user.findUnique({
      where: { id: idUser },
    });
    if (!userRequest) {
      throw new AppError("Admin or Academic Center not found.", 401);
    }

    if (
      !userRequest.roles.includes(Role.ADMIN) &&
      !userRequest.roles.includes(Role.ACADEMIC_CENTER)
    ) {
      throw new AppError("User does not have permission.", 401);
    }

    let user = await prismaClient.user.findFirst({ where: { mail } });
    if (user) {
      throw new AppError("You already have a user with this email.");
    }

    if (password.length < 6) {
      throw new AppError("Password too weak.", 400);
    }

    const hashedPassword = await hash(password, 8);

    user = await prismaClient.user.create({
      data: {
        name,
        mail,
        password: hashedPassword,
        registration,
        roles: [Role.PROFESSOR],
        academicCenterId: userRequest.roles.includes(Role.ACADEMIC_CENTER)
          ? userRequest.id
          : null,
      },
    
    });
    //TODO: enviar email ao professor com sua senha
    delete user.password;
    return user;
  }
}

export { CreateProfessorService };
