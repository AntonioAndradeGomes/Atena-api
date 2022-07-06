import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";


interface IRquest{
  id: string;
  description: string;
  mail: string;
  isCheck: boolean;
}

class UpdateTaskService{
  async execute({id, description, mail, isCheck}: IRquest){
    let request = await prismaClient.task.findUnique({ where: { id } });
    if (!request) {
      throw new AppError("Request not found");
    }
    request = await prismaClient.task.update({where: {id}, data: {description, mail, isCheck}});
    return request;
  }
}

export {UpdateTaskService}
