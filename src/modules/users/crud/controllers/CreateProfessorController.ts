import { Request, Response } from "express";
import { CreateProfessorService } from "../services/CreateProfessorService";

class CreateProfessorController{
  async hundle(request: Request, response: Response){
    const idUser = request.user_id;
    const { name, mail, password, registration } = request.body;
    const service = new CreateProfessorService();
    return response
      .status(201)
      .json(
        await service.execute({ 
          idUser, 
          name, 
          mail, 
          password, 
          registration, 

        })
      );
  }

}

export {CreateProfessorController}
