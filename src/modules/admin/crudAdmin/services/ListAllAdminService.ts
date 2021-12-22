import prismaClient from "../../../../prisma";

class ListAllAdminService {
  async execute() {
    const admins = await prismaClient.admin.findMany({
      select: {
        mail: true,
        username: true,
        updatedAt: true,
        id: true,
        createdAt: true,
        password: false,
      },
    });

    return admins;
  }
}

export {ListAllAdminService}
