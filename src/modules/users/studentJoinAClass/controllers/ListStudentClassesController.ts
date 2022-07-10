import { Request, Response } from "express";
import { SutentClassesService } from "../services/SutentClassesService";

class ListStudentClassesController{
  async hundle(request: Request, response: Response) {
    const studentId= request.user_id;
    const page = Number(request.query.page) || 1;
    const active =
      request.query.active == undefined
        ? null
        : !(request.query.active.toString().toLowerCase() == "false");
    const service = new  SutentClassesService();
    const res = await service.execute({studentId, active, page,});
    return response.json(res);
  }
}

export {ListStudentClassesController}
