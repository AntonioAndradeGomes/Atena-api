import { Request, Response } from "express";
import { AdminUpdateUserService } from "../services/AdminUpdateUserService";

class AdminUpdateUserController {
  async hundle(request: Request, response: Response) {
    const adminId = request.user_id;
    const userId = request.params.id;
    const { name, role, registration, caInitDate, caEndDate } = request.body;
    const service = new AdminUpdateUserService();
    return response
      .status(200)
      .json(
        await service.execute({
          adminId,
          userId,
          name,
          role,
          registration,
          caEndDate,
          caInitDate,
        })
      );
  }
}

export { AdminUpdateUserController };
