import prismaClient from "../../../prisma"

class ListAllAccessCodeService{

  async execute(){
    const codes = await prismaClient.accessCode.findMany();
    return codes;
  }
  
}

export {ListAllAccessCodeService}
