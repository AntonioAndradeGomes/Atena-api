import { Request, Response } from "express";
import { ListAllUsersService } from "../services/ListAllUsersService";
import { ListUserByIdService } from "../services/ListUserByIdService";


class ListUserController {
  
  async listAll(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const service = new ListAllUsersService();
    return response.json( await service.execute({page}));
  }
  
  async listById(request: Request, response: Response){
    const id = request.params.id;
    const service = new ListUserByIdService();
    return response.json(await service.execute(id) || {});
  }
  
}

export { ListUserController }
