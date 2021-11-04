import prismaClient from "../../../prisma";

class DeleteDisciplineService{
  async execute(id: string){
    const discipline = await prismaClient.discipline.delete({
      where: { 
        id
      }
    });
    return discipline;
  };
};

export { DeleteDisciplineService };
