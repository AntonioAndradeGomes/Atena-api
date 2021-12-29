import { Request, Response } from "express";
import { AuthAdminService } from "../services/AuthAdminService";


class AuthAdminController {
  async handle(request: Request, response: Response) {
    const { mail, password } = request.body;
    const service = new AuthAdminService();
    const result = await service.execute({mail, password });
    return response.json(result);
  }
}
export{AuthAdminController}
