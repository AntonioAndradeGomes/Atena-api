import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { token, password } = request.body;
    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ token, password });

    return response.status(204).json();
  };
};

export { ResetPasswordController };
