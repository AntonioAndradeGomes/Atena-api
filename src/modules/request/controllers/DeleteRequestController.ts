import { Request, Response } from "express";
import { DeleteRequestService } from "../services/DeleteRequestService";

class DeleteRequestController{

  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteRequestService();
    return response.status(204).json(await service.execute(id));
  }
  
}

export {DeleteRequestController}
