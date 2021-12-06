import prismaClient from "../../../prisma"

class ListByCodeAccessCodeService{

  async execute(code : string){
    const access = await prismaClient.accessCode.findUnique({where: {code}});
    return access;
  }
  
}

export {ListByCodeAccessCodeService}
