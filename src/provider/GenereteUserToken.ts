import { v4 as uuidv4 } from "uuid";
import prismaClient from "../prisma";

interface IRequest{
  userId: string;
}


class GenereteUserToken{
  async execute({ userId }: IRequest) {
    var token = uuidv4();
    const tokenInstance = await prismaClient.userToken.upsert({
      where: {
        id: userId 
      },
      update: {
        token
      },
      create: {
        token,
        userId
      },
    });

    return tokenInstance;
  }
}

export {GenereteUserToken}
