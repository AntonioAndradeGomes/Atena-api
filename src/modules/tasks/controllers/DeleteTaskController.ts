import { Request, Response } from "express";
import { DeleteTaskService } from "../services/DeleteTaskService";

class DeleteTaskController{

  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteTaskService();
    return response.status(204).json(await service.execute(id));
  }
  
}

export {DeleteTaskController}
