import { Request, Response } from "express";
import { allEvents, createEvent, deleteEvent, retrieveEvent, updateEvent } from "../services";

export async function allEventsController(request: Request, response: Response){
  const result = await allEvents();
  return response.status(200).json(result);
};

export async function createEventController(request: Request, response: Response){
  const {title, description, isActive, difficultyLevel, initDate, endDate} = request.body;
  const result = await createEvent({
    title,
    description,
    isActive,
    difficultyLevel,
    initDate,
    endDate
  }).then(() => {
    return response.status(201).json(result);  
  }).catch(() => {
    return response.status(400).json({'error': 'verifique sua requisição'});
  });
};

export async function retrieveEventController(request: Request, response: Response){
  const id = request.params.id;
  const result = await retrieveEvent(id).then(() => {
    return response.status(200).json(result);  
  }).catch(() => {
    return response.status(400).json({'error': 'verifique sua requisição'});
  });
};

export async function updateEventController(request: Request, response: Response){
  const id = request.params.id;
  const data = request.body;
  const result = await updateEvent(id, data).then(() => {
    return response.status(200).json(result);
  }).catch(() => {
    return response.status(400).json({'error': 'verifique sua requisição'})
  });
};

export async function deleteEventController(request: Request, response: Response){
  const id = request.params.id;
  const result = await deleteEvent(id).then(() => {
    return response.status(204).json(result);  
  }).catch(() => {
    return response.status(400).json({'error': 'Esse id não existe'});
  })
};
