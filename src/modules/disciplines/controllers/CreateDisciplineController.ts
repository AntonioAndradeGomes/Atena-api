import { Request, Response } from "express";
import { CreateDisciplineService } from "../services/CreateDisciplineService";

class CreateDisciplineController{
    async hundle(request: Request, response: Response){
        const {code, name, initials, workload} = request.body;
        const service = new CreateDisciplineService();
        const result = await service.execute({code, name, initials, workload});

        return response.status(201).json(result);
    };
};

export { CreateDisciplineController };
