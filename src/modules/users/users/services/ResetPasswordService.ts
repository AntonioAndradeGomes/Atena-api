import { AppError } from "../../../../errors/AppError";
import { isAfter, addHours } from "date-fns"
import prismaClient from "../../../../prisma";
import { hash } from "bcryptjs";

interface IRequest {
  token: string,
  password: string
};

class ResetPasswordService {
  async execute({ token, password }: IRequest) {
    const userToken = await prismaClient.userToken.findFirst({
      where: { token }
    });

    if (!userToken) {
      throw new AppError("User token doesn't exist");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userToken.userId
      }
    });

    if (!user) {
      throw new AppError("User doesn't exist");
    }

    const tokenLastUpdate = userToken.updateAt;
    const compareDate = addHours(tokenLastUpdate, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    };

    const newPassword = await hash(password, 8)
    
    await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        password: newPassword
      }
    });
  }
};

export { ResetPasswordService };
