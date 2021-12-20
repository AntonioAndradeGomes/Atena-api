import prismaClient from "../../../../prisma"

class ListByUserProfessorService{

  async execute(idUser: string){
    const users = await prismaClient.user.findMany({where: {academicCenterId: idUser, isProfessor: true}, select: {
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
    },});
    return users;
  }
}

export {ListByUserProfessorService}
