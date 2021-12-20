import prismaClient from "../../../../prisma"

class ListByIdProfessorService{

  async execute(idUser: string){
    const user = await prismaClient.user.findFirst({where: {id: idUser, isProfessor: true}, select: {
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

    if(!user){
      return {
        message : "User with this id does not exist",
      };
    }
    return user;
  }
}

export {ListByIdProfessorService}
