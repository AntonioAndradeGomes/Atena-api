import { Request, Response } from "express";
import { AdminDeleteUserService } from "../services/AdminDeleteUserService";

class AdminDeleteUserController{
  async hundle(request: Request, response: Response) {
    const adminId = request.user_id;
    const userDeletedId = request.params.id;
    const service = new AdminDeleteUserService();
    return response.status(204).json(await service.execute({adminId, userDeletedId}));
  }
}

export {AdminDeleteUserController}
