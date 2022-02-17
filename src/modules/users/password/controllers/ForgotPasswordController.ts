import { Request, Response } from "express";
import { SendForgotPasswordEmailService } from "../services/SendForgotPasswordEmailService";

class ForgotPasswordController{
  async hundle(request: Request, response: Response){
    const {mail} = request.body;
    const service = new SendForgotPasswordEmailService();
    await service.execute({mail});
    return response.status(204).json();
  }
}

export {ForgotPasswordController}
