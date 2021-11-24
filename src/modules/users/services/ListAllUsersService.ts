import prismaClient from "../../../prisma";

class ListAllUsersService{
  async execute() {
    const users = await prismaClient.user.findMany({include: {academicCenter: true}});
    
    return users;
  }
}
export {ListAllUsersService}
