import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController{

  async updateUser(request: Request, response: Response){
    const {registration, name} = request.body;
    const id = request.user_id;
    const service = new UpdateUserService();
    return response.json(await service.execute({id, registration, name}))
  }


}

export { UpdateUserController }
