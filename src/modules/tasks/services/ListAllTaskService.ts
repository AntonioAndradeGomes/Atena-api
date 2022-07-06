import prismaClient from "../../../prisma";

interface IRequest {
  page: number
}
class ListAllTaskService{
  async execute({page}: IRequest) {
    const skip = (page * 10) - 10;
    const requests = await prismaClient.task.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          updatedAt: "desc"
        }
      ],
      where: {},
    });

    const countRequests = await prismaClient.task.count();

    const lastPage = Math.ceil(countRequests / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      "actualPage" : page,
      "actualLength": requests.length,
      "total": countRequests,
      lastPage,
      prev,
      next,
      "data": requests,
      
    };
  }
}

export {ListAllTaskService}
