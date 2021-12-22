import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";
import { GenerateTokenController } from "../../userToken/controllers/GenerateTokenController";

interface IRequest {
  mail: string
};

class ForgotPasswordService {
  async execute({ mail }: IRequest) {
    const user = await prismaClient.user.findFirst({
      where: { mail }
    });

    if(!user) {
      throw new AppError("User dosen't exist");
    };

    const generateToken = new GenerateTokenController();
    const token = await generateToken.handle(user.id);
    console.log(token);

  };
};

export { ForgotPasswordService };
