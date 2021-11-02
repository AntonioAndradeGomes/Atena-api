import {Request, Response} from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { CreateUserStudentService } from '../services/CreateUserStudentService';

class UserCreateController{
  // TODO: rota só acessivel ao admin -> unico usuario que pode se criar é o estudante
  async create(request: Request, response: Response) {
    const {name, mail, isStudent, isProfessor, isAcademicCenter, registration, code, caEndDate, caInitDate} = request.body;
    const service = new CreateUserService();
    const result = await service.execute({name, mail, isStudent, isProfessor, isAcademicCenter, registration, code, caEndDate, caInitDate});
    return response.status(201).json(result);
  }

  async createStudent(request: Request, response: Response){
    const { token, code, registration } = request.body;
    const service = new CreateUserStudentService();
    // TODO: verificar o code
    const result = await service.execute({token, code, registration});
    return response.status(201).json(result);
  }
}


export {UserCreateController}
