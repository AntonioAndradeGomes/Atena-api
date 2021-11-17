import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController{

  async deleteUser(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteUserService();
    return response.json(await service.execute(id));
  }
  

}

export { DeleteUserController }