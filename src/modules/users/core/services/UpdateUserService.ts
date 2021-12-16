import prismaClient from "../../../../prisma"

interface IRequest{
  name: string;
  registration: string;
  id: string;
}

class UpdateUserService{
  async execute({id, registration, name} : IRequest){
    const user = await prismaClient.user.update({where: {id}, data: {registration, name,},});
    return user;
  }
}

export { UpdateUserService }
