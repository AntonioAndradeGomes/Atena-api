import { Request, Response } from "express";
import { ListAllUsersService } from "../services/ListAllUsersService";


class ListUserController {
  
  async hundle(request: Request, response: Response){
    const service = new ListAllUsersService();
    return response.json( await service.execute());
  }
  
}

export { ListUserController }
