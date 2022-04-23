import { Request, Response } from "express";
import { ListAllTaskService } from "../services/ListAllTaskService";
import { ListByIdTaskService } from "../services/ListByIdTaskService";

class ListTaskController{
  async listAll(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const q = request.query.q;
    console.log(q);
    const service = new ListAllTaskService();
    return response.json(await service.execute({page}));
  }

  async listById(request: Request, response: Response){
    const id = request.params.id;
    const service = new ListByIdTaskService();
    return response.json(await service.execute(id));
  }
}

export {ListTaskController}
