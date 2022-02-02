import prismaClient from "../../../prisma";

interface IRequest {
  page: number
}
class ListAllRequestService{
  async execute({page}: IRequest) {
    const skip = (page * 10) - 10;
    const requests = await prismaClient.request.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          mail: "asc"
        }
      ]
    });

    const countRequests = await prismaClient.request.count();

    const lastPage = Math.ceil(countRequests / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage ? null : page + 1;

    return {
      "total": countRequests,
      lastPage,
      prev,
      next,
      "data": requests,
    };
  }
}

export {ListAllRequestService}
