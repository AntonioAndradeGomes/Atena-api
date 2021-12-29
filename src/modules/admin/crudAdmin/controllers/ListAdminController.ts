import { Request, Response } from "express";
import { ListAllAdminService } from "../services/ListAllAdminService";
import { ListByIdAdminService } from "../services/ListByIdAdminService";

class ListAdminController{

  async listAll(request: Request, response: Response){
    const service = new ListAllAdminService();
    return response.json(await service.execute());
  }

  async listById(request: Request, response: Response){
    const id = request.params.id;
    const service = new ListByIdAdminService();
    return response.json(await service.execute(id));
  }
}

export {ListAdminController}
