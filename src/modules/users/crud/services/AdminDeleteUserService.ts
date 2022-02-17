import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  userDeletedId: string;
  adminId: string;
}

class AdminDeleteUserService {
  async execute({ userDeletedId, adminId }: IRequest) {
    const userDeleted = await prismaClient.user.findUnique({
      where: { id: userDeletedId },
    });

    if (!userDeleted) {
      throw new AppError("User to be deleted does not exist");
    }

    const admin = await prismaClient.user.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new AppError("Admin not found.");
    }

    if (!admin.roles.includes(Role.ADMIN)) {
      throw new AppError("User cannot use this feature.", 401);
    }

    await prismaClient.user.delete({ where: { id: userDeletedId } });
    
    return {};
  }
}

export { AdminDeleteUserService };
