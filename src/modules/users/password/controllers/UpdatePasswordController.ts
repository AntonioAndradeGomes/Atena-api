import { Request, Response } from "express";
import { UpdatePasswordService } from "../services/UpdatePasswordService";

class UpdatePasswordController{
  async hundle(request: Request, response: Response){
    const id = request.user_id;
    const {oldpassword, newpassword} = request.body;
    const service = new UpdatePasswordService();
    return response.status(200).json(await service.execute({id, newpassword, oldpassword}));
  }
}

export {UpdatePasswordController}
