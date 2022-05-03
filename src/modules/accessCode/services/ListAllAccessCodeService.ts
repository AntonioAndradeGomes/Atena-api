import prismaClient from "../../../prisma"

interface IAccessCode {
  page: number
}

class ListAllAccessCodeService{
  async execute({page}: IAccessCode) {
    const skip = (page * 10) - 10;
    const accessCodes = await prismaClient.accessCode.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    });

    const countAccessCodes = await prismaClient.accessCode.count();

    const lastPage = Math.ceil(countAccessCodes / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      "total": countAccessCodes,
      lastPage,
      prev,
      next,
      "data": accessCodes,
    };
  }  
}

export {ListAllAccessCodeService}
