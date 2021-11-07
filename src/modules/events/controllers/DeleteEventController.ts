import { Request, Response } from "express";
import { DeleteEventService } from "../services/DeleteEventService";

class DeleteEventController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteEventService();
    const result = service.execute(id);

    return response.status(204).json(result);
  };
};

export { DeleteEventController };