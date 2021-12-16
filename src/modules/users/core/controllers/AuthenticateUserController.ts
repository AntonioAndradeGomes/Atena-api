import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {
  async hundle(request: Request, response: Response) {
    const { token } = request.body;
    const service = new AuthenticateUserService();
    const result = await service.execute(token);
    return response.json(result);
  }
}
export{AuthenticateUserController}
