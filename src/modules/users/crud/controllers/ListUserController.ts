import { Request, Response } from "express";
import { ListUserByIdService } from "../services/ListUserByIdService";
import { ListAllUsersService } from "../services/ListAllUserService";

class ListUserController {
  async hundle(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const service = new ListAllUsersService();
    return response.json(await service.execute({ page }));
  }

  async hundleById(request: Request, response: Response) {
    const userId = request.params.id;
    const service = new ListUserByIdService();
    return response.json(await service.execute({ userId}));
  }
}

export { ListUserController };
