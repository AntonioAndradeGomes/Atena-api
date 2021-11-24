import prismaClient from "../../../../prisma"

class ListAllProfessorService{

  async execute(){
    const users = await prismaClient.user.findMany({where : {isProfessor: true}, include: {academicCenter: true}});
    return users;
  }

}

export {ListAllProfessorService}
