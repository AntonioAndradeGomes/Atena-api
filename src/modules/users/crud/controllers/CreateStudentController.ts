import { Request, Response } from "express";
import { CreateUserStudentService } from "../services/CreateUserStudentService";

class CreateStudentController{
  async hundle(request: Request, response: Response){
    const { name, mail, password, registration, code } = request.body;
    const service = new CreateUserStudentService();
    return response
      .status(201)
      .json(
        await service.execute({ 
          name, 
          mail, 
          password, 
          registration, 
          code, 
        })
      );
  }

}

export {CreateStudentController}
