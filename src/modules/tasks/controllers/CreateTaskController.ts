import { Request, Response } from "express";
import { CreateTaskService } from "../services/CreateTaskService";

class CreateTaskController{

  async hundle(request: Request, response: Response){
    const {description, mail, isCheck} = request.body;
    const service = new CreateTaskService();
    return response.status(201).json(await service.execute({description, mail, isCheck}));
  }
  
}

export {CreateTaskController}
