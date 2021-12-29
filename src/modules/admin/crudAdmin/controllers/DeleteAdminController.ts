import { Request, Response } from "express";
import { DeleteAdminService } from "../services/DeleteAdminService";

class DeleteAdminController{
  async execute(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteAdminService();
    return response.json(await service.execute(id));
  }
}

export {DeleteAdminController}
