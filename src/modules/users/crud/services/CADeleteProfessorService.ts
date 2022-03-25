import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  userDeletedId: string;
  caId: string;
}

class CADeleteProfessorService {
  async execute({ userDeletedId, caId }: IRequest) {
    const userDeleted = await prismaClient.user.findUnique({
      where: { id: userDeletedId },
    });

    if (!userDeleted) {
      throw new AppError("User to be deleted does not exist");
    }

    const ca = await prismaClient.user.findUnique({
      where: { id: caId },
    });

    if (!ca) {
      throw new AppError("Academic Center not found.");
    }

    if (!ca.roles.includes(Role.ACADEMIC_CENTER)) {
      throw new AppError("User cannot use this feature.", 401);
    }

    if(!userDeleted.roles.includes(Role.PROFESSOR)){
      throw new AppError("Academic Center cannot use this feature.", 401);
    }

    await prismaClient.user.delete({ where: { id: userDeletedId } });
    
    return {};
  }
}

export { CADeleteProfessorService };
