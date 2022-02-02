import { Request, Response } from "express";
import { ListAllRequestService } from "../services/ListAllRequestService";
import { ListByIdRequestService } from "../services/ListByIdRequestService";

class ListRequestController{
  async listAll(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const service = new ListAllRequestService();
    return response.json(await service.execute({page}));
  }

  async listById(request: Request, response: Response){
    const id = request.params.id;
    const service = new ListByIdRequestService();
    return response.json(await service.execute(id));
  }
}

export {ListRequestController}
