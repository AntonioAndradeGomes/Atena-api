import { Request, Response } from "express";
import { RefreshTokenService } from "../services/RefreshTokenService";


class RefreshTokenController{
  async handle(request: Request, response: Response){
    const id = request.user_id;
    const service = new RefreshTokenService();
    return response.status(201).json(await service.execute(id));
  }
}

export {RefreshTokenController}
