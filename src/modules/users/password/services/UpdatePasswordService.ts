import { compare, hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  id: string;
  newpassword: string;
  oldpassword: string;
}

class UpdatePasswordService{
  async execute({id, newpassword, oldpassword}: IRequest){
    let user = await prismaClient.user.findUnique({where: {id}});
    if(!user){
      throw new AppError("User not found.", 401);
    }
    const passwordConfirmed = await compare(oldpassword, user.password);
    if (!passwordConfirmed) {
      throw new AppError("Iconrrect old password");
    }
    const hashPass = await hash(newpassword, 8);
    user = await prismaClient.user.update({where : {id}, data: {password: hashPass,}});
    delete user.password;
    return user;
  }
}

export {UpdatePasswordService}
