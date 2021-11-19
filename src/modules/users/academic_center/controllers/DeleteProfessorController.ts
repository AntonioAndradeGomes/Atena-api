import { Request, Response } from "express";
import { DeleteProfessorService } from "../services/DeleteProfessorService";


class DeleteProfessorController{
  async delete(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteProfessorService();
    const result = await service.execute(id);
    return response.status(201).json(result);
  }
}

export {DeleteProfessorController}
