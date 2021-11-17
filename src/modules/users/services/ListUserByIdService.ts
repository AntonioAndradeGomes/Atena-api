import prismaClient from "../../../prisma";

class ListUserByIdService{
  async execute(id: string) {
    return await prismaClient.user.findUnique({where: {id}, include: {academicCenter : true}});
  }
}
export {ListUserByIdService}
