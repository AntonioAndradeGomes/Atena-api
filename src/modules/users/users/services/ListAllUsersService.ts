import prismaClient from "../../../../prisma";

class ListAllUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        password: false,
        id: true,
        name: true,
        mail: true,
        isStudent: true,
        isProfessor: true,
        isAcademicCenter: true,
        registration: true,
        code: true,
        caInitDate: true,
        caEndDate: true,
        createdAt: true,
        updatedAt: true,
        academicCenterId: true,
        academicCenter: true,
      },
    });

    return users;
  }
}
export { ListAllUsersService };
