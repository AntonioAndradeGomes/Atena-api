import { Request, Response } from "express";
import { RefrashTokenService } from "../services/RefrashTokenController";


class RefrashTokenController{
  async hundle(request: Request, response: Response){
    const id = request.user_id;
    const service = new RefrashTokenService();
    return response.status(201).json(await service.execute(id));
  }
}

export {RefrashTokenController}
