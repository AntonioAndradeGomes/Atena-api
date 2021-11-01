import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {
  async hundle(request: Request, response: Response) {
    const { token } = request.body;
    const service = new AuthenticateUserService();
    const {message, user, code } = await service.execute(token);
    return response.status(code).json({message, user, statusCode: code,});
  }
}
export{AuthenticateUserController}
