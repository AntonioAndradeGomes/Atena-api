import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListAllUsersService } from "../services/ListAllUsersService";


class UserController {
  
  // TODO: rota só acessivel ao admin -> unico usuario que pode se criar é o estudante
  async create(request: Request, response: Response) {
    
    const {name, mail, type} = request.body;
    const service = new CreateUserService();
    const result = await service.execute({name, mail,type});
    return response.status(201).json(result);

  }

  async readAll(request: Request, response: Response){
    const service = new ListAllUsersService();
    return response.json( await service.execute());
  }
  
}

export { UserController }
