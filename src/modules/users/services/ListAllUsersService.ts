import prismaClient from "../../../prisma";

class ListAllUsersService{
  async execute() {
    const users = await prismaClient.user.findMany();
    
    return users;
  }
}
export {ListAllUsersService}
