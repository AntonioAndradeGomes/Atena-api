import prismaClient from "../../../prisma";

class AllEventsService{
  async execute(){
    const events = await prismaClient.event.findMany();
    return events;
  }
}

export {AllEventsService}
