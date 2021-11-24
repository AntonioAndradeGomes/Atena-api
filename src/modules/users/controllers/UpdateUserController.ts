import { Request, Response } from "express";
import { UpdateAllDataUserService } from "../services/UpdateAllDataUserService";
import { UpdateUserService } from "../services/UpdateUserService";


class UpdateUserController {

  async updateUser(request: Request, response: Response) {
    const { registration, name } = request.body;
    const id = request.user_id;
    const service = new UpdateUserService();
    return response.json(await service.execute({ id, registration, name }))
  }

  async updateAllDataUser(request: Request, response: Response) {
    const id = request.params.id;
    const { name, mail, isStudent, isAcademicCenter, isProfessor, registration, code, caEndDate, caInitDate } = request.body;
    const service = new UpdateAllDataUserService();
    return  response.json(await service.execute({id, name, mail, isStudent, isAcademicCenter, isProfessor, registration, code, caEndDate, caInitDate }));
  }

}

export { UpdateUserController }
