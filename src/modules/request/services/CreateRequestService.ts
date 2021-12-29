import prismaClient from "../../../prisma"


interface IRquest{
  description: string;
  mail: string;
  isCheck: boolean;
}

class CreateRequestService{
  async execute({description, mail, isCheck} : IRquest){
    const request = await prismaClient.request.create({data: {mail, description, isCheck}});
    return request;
  }
}

export {CreateRequestService}
