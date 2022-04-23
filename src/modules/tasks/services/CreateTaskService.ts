import prismaClient from "../../../prisma"


interface IRquest{
  description: string;
  mail: string;
  isCheck: boolean;
}

class CreateTaskService{
  async execute({description, mail, isCheck} : IRquest){
    const request = await prismaClient.task.create({data: {mail, description, isCheck}});
    return request;
  }
}

export {CreateTaskService}
