import prismaClient from "../../../prisma";

class AllClassesService{
  async execute(){
    const classes = prismaClient.class.findMany({include : {professor : true, academicCenter: true,}});
    return classes;
  };
};

export { AllClassesService };
