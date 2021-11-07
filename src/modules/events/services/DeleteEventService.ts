import prismaClient from "../../../prisma";

class DeleteEventService{
  async execute(id: string){
    const discipline = prismaClient.event.delete({
      where: {
        id
      }
    });
    return discipline;
  };
};

export { DeleteEventService };
