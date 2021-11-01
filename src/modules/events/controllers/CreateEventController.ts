import { Request, Response } from "express";
import { CreateEventService } from "../services/CreateEventService";

class CreateEventController{
  async hundle(request: Request, response: Response){
    const {title, description, isActive, dificulty, init_date, end_date} = request.body;
    const service = new CreateEventService();
    const result = await service.execute({title, description, isActive, dificulty, init_date, end_date});
    return response.status(201).json(result);
  }
}
export {CreateEventController}
