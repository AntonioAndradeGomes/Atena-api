import prismaClient from "../../../prisma";

class ListByIdTaskService{
   async execute(id: string){
     const request = await prismaClient.task.findUnique( {where: {id}});
     return request;
   }
}

export {ListByIdTaskService}
