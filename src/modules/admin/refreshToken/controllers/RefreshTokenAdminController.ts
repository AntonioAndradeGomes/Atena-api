import { Request, Response } from "express";
import { RefreshTokenAdminService } from "../services/RefreshTokenAdminService";



class RefreshTokenAdminController{
  async handle(request: Request, response: Response){
    const id = request.user_id;
    const service = new RefreshTokenAdminService();
    return response.status(201).json(await service.execute(id));
  }
}

export {RefreshTokenAdminController}
