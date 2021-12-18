import { Request, Response } from "express";
import { CreateProfessorService } from "../services/CreateProfessorService";

class CreateProfessorController{

  async create(request: Request, response: Response){
    const {name, mail, registration} = request.body; 
    const academicCenterId = request.user_id;
    const service = new CreateProfessorService();
    const result = await service.execute({academicCenterId, name, mail, registration});
    return response.status(201).json(result);
  }

}

export {CreateProfessorController}
