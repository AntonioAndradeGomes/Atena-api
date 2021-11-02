import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListAllUsersService } from "../services/ListAllUsersService";


class UserController {
  
  

  async readAll(request: Request, response: Response){
    const service = new ListAllUsersService();
    return response.json( await service.execute());
  }
  
}

export { UserController }
