import { Request, Response } from "express";
import { CreateAdminService } from "../services/CreateAdminService";

class CreateAdminController{

  async hundle(request: Request, response: Response){
    const {username, mail, password} = request.body;
    const service = new CreateAdminService();
    return response.status(201).json(await service.execute({username, mail, password}));
  }
}

export {CreateAdminController}
