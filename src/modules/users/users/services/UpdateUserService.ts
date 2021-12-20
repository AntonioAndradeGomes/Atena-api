import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma"

interface IRequest{
  name: string;
  registration: string;
  id: string;
  password: string | null;
}

class UpdateUserService{
  async execute({id, registration, name, password} : IRequest){

    const user = prismaClient.user.findUnique({where: {id}});

    if(!user){
      throw new AppError('User does not exist');
    }
    if(password) {
      if(password.length < 6){
        throw new AppError("Password too weak.", 400);
      }else{
        const hashedPassword = await hash(password, 8);
        const userUp = await prismaClient.user.update({where: {id}, data: {registration, name, password: hashedPassword},});
        delete userUp.password;
        return userUp;
      }
    }else{
      const userUp = await prismaClient.user.update({where: {id}, data: {registration, name},});
      delete userUp.password;
      return userUp;
    }
  }
}

export { UpdateUserService }
