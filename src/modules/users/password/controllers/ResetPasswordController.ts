import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class ResetPasswordController{
  async hundle(request: Request, response: Response){
    const {newpassword, token} = request.body;
    const service = new ResetPasswordService();
    
    await service.execute({token, newpassword});
    return response.status(204).json();
  }

}

export {ResetPasswordController}
