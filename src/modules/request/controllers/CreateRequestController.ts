import { Request, Response } from "express";
import { CreateRequestService } from "../services/CreateRequestService";

class CreateRequestController{

  async hundle(request: Request, response: Response){
    const {description, mail, isCheck} = request.body;
    const service = new CreateRequestService();
    return response.status(201).json(await service.execute({description, mail, isCheck}));
  }
  
}

export {CreateRequestController}
