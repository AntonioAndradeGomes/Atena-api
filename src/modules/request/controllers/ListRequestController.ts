import { Request, Response } from "express";
import { ListAllRequestService } from "../services/ListAllRequestService";
import { ListByIdRequestService } from "../services/ListByIdRequestService";

class ListRequestController{
  async listAll(request: Request, response: Response){
    const service = new ListAllRequestService();
    return response.json(await service.execute());
  }

  async listById(request: Request, response: Response){
    const id = request.params.id;
    const service = new ListByIdRequestService();
    return response.json(await service.execute(id));
  }
}

export {ListRequestController}
