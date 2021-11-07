import prismaClient from "../../../prisma";

class DeleteClassService{
  async execute(id: string){
    const classInstance = await prismaClient.class.delete({
      where: {
        id
      }
    });
    return classInstance;
  };
};

export { DeleteClassService };
