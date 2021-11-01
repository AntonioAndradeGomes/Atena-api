import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  name: string;
  mail: string;
  type: string;
}


class CreateUserService{
  async execute({name, mail, type} : IRequest){
    let user = await prismaClient.user.findFirst({
      where :{
        mail,
      }
    });
    if(user){
      throw new AppError("User already exists", 400);
    }
    user = await prismaClient.user.create({
      data: {
        name,
        mail,
        type
      }
    });
    return user;
  }
}

export {CreateUserService}
