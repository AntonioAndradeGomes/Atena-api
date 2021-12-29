import prismaClient from "../../../prisma";

class ListAllRequestService{
   async execute(){
     const requests = await prismaClient.request.findMany();
     return requests;
   }
}

export {ListAllRequestService}
