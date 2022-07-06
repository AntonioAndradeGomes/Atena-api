import { Request, Response } from "express";
import { DeleteDisciplineService } from "../services/DeleteDisciplineService";

class DeleteDisciplineController{
  async handle(request: Request, response: Response){
    const id = request.params.id;
    const userId = request.user_id;
    const service = new DeleteDisciplineService();
    const result = await service.execute({idUser: userId, idDiscipline: id,});

    return response.status(204).json(result);
  };
};

export { DeleteDisciplineController }
