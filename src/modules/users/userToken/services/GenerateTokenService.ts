import prismaClient from "../../../../prisma";
import { v4 as uuidv4 } from "uuid";

interface IRequest {
  userId: string
}

class GenerateTokenService {
  async execute({ userId }: IRequest) {
    var token = uuidv4();
    const tokenInstance = await prismaClient.userToken.upsert({
      where: {
        userId: userId 
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
};

export { GenerateTokenService };
