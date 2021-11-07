import prismaClient from "../../../prisma";

interface IRequest{
  title: string
  description: string
  isActive: boolean
  difficultyLevel: number
  initDate: string
  endDate: string
}

class CreateEventService{
  async execute({title, description, isActive, difficultyLevel, initDate, endDate} : IRequest){
    const event = await prismaClient.event.create({
      data: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate,
      }}
    );
    return event;
  }
}

export { CreateEventService };
