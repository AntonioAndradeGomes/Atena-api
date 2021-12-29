import prismaClient from "../../../prisma";

class ListByIdRequestService{
   async execute(id: string){
     const request = await prismaClient.request.findUnique( {where: {id}});
     return request;
   }
}

export {ListByIdRequestService}
