import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";


interface IRquest{
  id: string;
  description: string;
  mail: string;
  isCheck: boolean;
}

class UpdateRequestService{
  async execute({id, description, mail, isCheck}: IRquest){
    let request = await prismaClient.request.findUnique({ where: { id } });
    if (!request) {
      throw new AppError("Request not found");
    }
    request = await prismaClient.request.update({where: {id}, data: {description, mail, isCheck}});
    return request;
  }
}

export {UpdateRequestService}
