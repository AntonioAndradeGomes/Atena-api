import prismaClient from "../../../prisma";

class RetrieveClassService{
  async execute(id: string){
    const classInstance = await prismaClient.class.findUnique({
      where: {
        id
      }
    });
    return classInstance;
  };
};

export { RetrieveClassService };
