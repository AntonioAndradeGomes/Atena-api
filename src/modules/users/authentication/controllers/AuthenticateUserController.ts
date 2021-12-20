import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { mail, password } = request.body;
    const service = new AuthenticateUserService();
    const result = await service.execute({mail, password });
    return response.json(result);
  }
}
export{AuthenticateUserController}
