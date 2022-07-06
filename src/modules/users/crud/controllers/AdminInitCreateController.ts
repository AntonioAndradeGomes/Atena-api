import { Request, Response } from "express";
import { AdminInitCreateService } from "../services/AdminInitCreateService";

class AdminInitCreateController{

  async hundle(request: Request, response: Response){
    const {jwtsecret} = request.body;
    const service = new AdminInitCreateService();
    return response.json(await service.execute({jwtsecret}));
  }
}

export {AdminInitCreateController};
