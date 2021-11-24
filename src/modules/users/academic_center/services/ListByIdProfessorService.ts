import prismaClient from "../../../../prisma"

class ListByIdProfessorService{

  async execute(idUser: string){
    const user = await prismaClient.user.findFirst({where: {id: idUser, isProfessor: true}, include : {academicCenter : true}});

    if(!user){
      return {
        message : "User with this id does not exist",
      };
    }
    return user;
  }
}

export {ListByIdProfessorService}
