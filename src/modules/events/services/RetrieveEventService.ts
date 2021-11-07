import prismaClient from "../../../prisma";

class RetrieveEventService{
  async execute(id: string){
    const event = await prismaClient.event.findUnique({
      where: {
        id
      }
    });
    return event;
  };
};

export { RetrieveEventService };
