import { Request, Response } from "express";
import { CreateProfessorService } from "../services/CreateProfessorService";
import { CreateUserService } from "../services/CreateUserService";
import { CreateUserStudentService } from "../services/CreateUserStudentService";

class CreateUserController {
  
  async hundle(request: Request, response: Response) {
    const adminId = request.user_id;
    const { name, mail, role, password, registration, caInitDate, caEndDate, } =
      request.body;
    const service = new CreateUserService();
    return response.status(201).json(
      await service.execute({
        adminId,
        name,
        mail,
        password,
        registration,
        caEndDate,
        caInitDate,
        role, 
      })
    );
  }

}

export { CreateUserController };
