import {Request, Response} from 'express';
import { UpdateProfessorService } from '../services/UpdateProfessorService';

class UpdateProfessorController{

  async update(request: Request, response: Response){
    const id = request.params.id;
    const {name, mail, registration} = request.body;
    const service = new UpdateProfessorService();
    return response.json(await service.execute({id, name, mail, registration}));
  }
  
}

export {UpdateProfessorController}
