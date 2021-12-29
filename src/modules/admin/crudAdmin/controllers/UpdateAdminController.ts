import { Request, Response } from "express";

import { UpdateAdminService } from "../services/UpdateAdminService";

class UpdateAdminController{

  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const {username, mail, password} = request.body;
    const service = new UpdateAdminService();
    return response.status(201).json(await service.execute({id,username, mail, password}));
  }
}

export {UpdateAdminController}
