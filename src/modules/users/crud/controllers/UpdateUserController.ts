import { Request, Response } from "express";
import { AdminUpdateUserService } from "../services/AdminUpdateUserService";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async hundle(request: Request, response: Response) {
    const userId = request.user_id;
    const { name } = request.body;
    const service = new UpdateUserService();
    return response.status(200).json(
      await service.execute({
        userId,
        name,
      })
    );
  }
}

export { UpdateUserController };
