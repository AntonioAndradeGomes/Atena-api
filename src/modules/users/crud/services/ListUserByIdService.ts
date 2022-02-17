import prismaClient from "../../../../prisma";

interface IUser {
  userId: string
}

class ListUserByIdService {
  async execute({userId}: IUser) {
   
    const user = await prismaClient.user.findUnique({
      where:{
        id: userId,
      },
      select: {
        password: false,
        id: true,
        name: true,
        mail: true,
        roles: true,
        registration: true,
        code: true,
        caInitDate: true,
        caEndDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
   
  }
}
export { ListUserByIdService };
