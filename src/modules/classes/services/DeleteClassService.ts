import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";
interface IRequest {
  userId: string;

  idClass: string;
}

class DeleteClassService {
  async execute({ userId, idClass }: IRequest) {
    //verificar usuario
    const userRequest = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!userRequest) {
      throw new AppError("User not found", 401);
    }
    //verificar se o user é ca ou admin
    if (
      !userRequest.roles.includes(Role.ACADEMIC_CENTER) &&
      !userRequest.roles.includes(Role.ADMIN)
    ) {
      throw new AppError("User does not have this permission.", 401);
    }
    const classAlreadyExist = await prismaClient.class.findFirst({
      where: {
        id: idClass,
      },
    });

    if (!classAlreadyExist) throw new AppError("Class does not exist");

    await prismaClient.class.delete({
      where: {
        id: idClass,
      },
    });

    return {};
  }
}

export { DeleteClassService };
