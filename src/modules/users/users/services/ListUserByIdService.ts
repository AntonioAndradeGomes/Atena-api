import prismaClient from "../../../../prisma";

class ListUserByIdService{
  async execute(id: string) {
    return await prismaClient.user.findUnique({where: {id}, select: {
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
    }, });
  }
}
export {ListUserByIdService}
