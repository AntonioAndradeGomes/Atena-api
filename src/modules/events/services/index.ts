import prismaClient from "../../../prisma";
import { Event } from "../../../types/event";

export async function allEvents(){
  const events = await prismaClient.event.findMany();
  return events
};

export async function createEvent({title, description, isActive, difficultyLevel, initDate, endDate}: Event){
  const event = await prismaClient.event.create({
    data: {
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate
    }
  });
  return event;
};

export async function retrieveEvent(id: string) {
  const event = await prismaClient.event.findUnique({
    where: {
      id
    }
  });
  return event;
};

export async function updateEvent(id: string, {title, description, isActive, difficultyLevel, initDate, endDate}: Event){
  const event = await prismaClient.event.update({
    where: {
      id
    },
    data: {
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate
    }
  });
  return event;
};

export async function deleteEvent(id: string){
  const event = await prismaClient.event.delete({
    where: {
      id
    }
  });
  return event;
};
