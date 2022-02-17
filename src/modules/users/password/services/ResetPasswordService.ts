import { AppError } from "../../../../errors/AppError";
import { isAfter, addHours } from "date-fns"
import prismaClient from "../../../../prisma";
import { hash } from "bcryptjs";

interface IRequest {
  token: string,
  newpassword: string
};

class ResetPasswordService {
  async execute({ token, newpassword }: IRequest) {
    const userToken = await prismaClient.userToken.findFirst({
      where: { token }
    });

    if (!userToken) {
      throw new AppError("User token doesn't exist");
    }

    let user = await prismaClient.user.findUnique({
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

    const newPass = await hash(newpassword, 8);
    
    user = await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        password: newPass
      }
    });
    delete user.password;
    return user;
  }
};

export { ResetPasswordService };
