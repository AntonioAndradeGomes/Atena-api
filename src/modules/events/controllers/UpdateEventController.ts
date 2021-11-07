import { Request, Response } from "express";
import { UpdateEventService } from "../services/UpdateEventService";

class UpdateEventController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const data = request.body;
    const service = new UpdateEventService();
    const result = await service.execute(id, data);

    return response.status(200).json(result);
  };
};

export { UpdateEventController };
