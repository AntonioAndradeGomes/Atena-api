import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController{
  async hundle(request: Request, response: Response){
    const userId = request.user_id;

    const service = new DeleteUserService();

    return response.status(204).json(await service.execute({userId}));
  }
}


export {DeleteUserController}
