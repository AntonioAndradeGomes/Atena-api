import prismaClient from "../../../prisma";

class RetrieveDisciplineService{
  async execute(id: string){
    const discipline = await prismaClient.discipline.findUnique({
      where: {
        id
      }
    });
    return discipline;
  };
};

export { RetrieveDisciplineService };
