import prismaClient from "../../../../prisma";

class ListByIdAdminService {
  async execute(id: string) {
    const admin = await prismaClient.admin.findMany({
      where: { id },
      select: {
        mail: true,
        username: true,
        updatedAt: true,
        id: true,
        createdAt: true,
        password: false,
      },
    });

    return admin;
  }
}

export { ListByIdAdminService };
