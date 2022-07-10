import { Request, Response } from "express";
import { AllClassesService } from "../services/AllClassesService";

class AllClassesController {
  async hundle(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const active =
      request.query.active == undefined
        ? null
        : !(request.query.active.toString().toLowerCase() == "false");
    const service = new AllClassesService();
    const result = await service.execute({ page, active });
    return response.status(200).json(result);
  }
}

export { AllClassesController };
