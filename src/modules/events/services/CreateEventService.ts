import prismaClient from "../../../prisma";

interface IRequest{
  title: string
  description: string
  isActive: boolean
  dificulty: number
  init_date: string
  end_date: string
}

class CreateEventService{
  async execute({title, description, isActive, dificulty, init_date, end_date} : IRequest){
    const event = await prismaClient.event.create({
      data: {
        title,
        description,
        isActive,
        dificulty,
        init_date,
        end_date,
      }}
    );
    return event;
  }
}

export {CreateEventService}
