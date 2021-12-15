import prismaClient from "../../../../prisma"

class ListStudentsOnClassService{
  async execute(){
    const list = await prismaClient.studentOnClasses.findMany({include: {class: true, student: true}});
    return list;
  }

} 

export {ListStudentsOnClassService}
