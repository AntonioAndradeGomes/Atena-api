import { Request, Response } from "express";
import { AllEventsService } from "../services/AllEventsService";
import { ListEventsProfessorService } from "../services/ListEventsProfessorService";
import { ListEventsWorkLoadService } from "../services/ListEventsWorkLoadService";

class AllEventsController {
  async handle(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const service = new AllEventsService();
    const result = await service.execute({ page });
    return response.json(result);
  }

  async hundleProfessor(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const professorId = request.user_id;
    const allEvents = request.query.allEvents == undefined ? false : request.query.allEvents.toString().toLowerCase() == 'true';
    const activeEvents = request.query.activeEvents== undefined ? true : request.query.activeEvents.toString().toLowerCase() == 'true';
    const service = new ListEventsProfessorService();
    
    return response.json(await service.execute({activeEvents, allEvents, page, professorId,}));
  }

  async hundleWorkLoad(request: Request, response: Response){
    const {timePeriodInit} = request.params;
    const classId = request.query.classId == undefined ? '' : request.query.classId.toString();
    const professorId = request.query.professorId == undefined ? '' : request.query.professorId.toString();;
    const service = new ListEventsWorkLoadService();
    return response.json(await service.execute({classId,professorId,timePeriodInit}));

  }
}

export { AllEventsController };
