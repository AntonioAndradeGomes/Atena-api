import prismaClient from "../../../../prisma"

class ListByUserProfessorService{

  async execute(idUser: string){
    const users = prismaClient.user.findMany({where: {academicCenterId: idUser, isProfessor: true}, include : {academicCenter : true}});
    return users;
  }
}

export {ListByUserProfessorService}