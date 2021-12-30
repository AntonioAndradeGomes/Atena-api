import prismaClient from "../../../prisma";

interface IEvent {
  page: number
}
class AllEventsService{
  async execute({page}: IEvent) {
    const skip = (page * 10) - 10;
    const events = await prismaClient.event.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          title: "asc"
        }
      ]
    });

    const countEvents = await prismaClient.event.count();

    const lastPage = Math.ceil(countEvents / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage ? null : page + 1;

    return {
      "total": countEvents,
      lastPage,
      prev,
      next,
      "data": events,
    };
  }
}

export {AllEventsService}
