import { Request, Response } from "express";
import { ForgotPasswordService } from "../services/ForgotPasswordService";

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const { mail } = request.body;

    const ForgotPasswordEmail = new ForgotPasswordService();
    await ForgotPasswordEmail.execute({mail})

    return response.status(204).json();
  };
};

export { ForgotPasswordController };
