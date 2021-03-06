import { Request, Response } from "express";
import { AllEventsService } from "../services/AllEventsService";
import { ListEventsProfessorService } from "../services/ListEventsProfessorService";
import { ListEventsWorkLoadService } from "../services/ListEventsWorkLoadService";
import { ListEventsWorkLoadStudentService } from "../services/ListEventsWorkLoadStudentService";
import { ListNextEventsClassService } from "../services/ListNextEventsClassService";

class AllEventsController {
  async hundle(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const service = new AllEventsService();
    const result = await service.execute({ page });
    return response.json(result);
  }

  async hundleProfessor(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const professorId = request.user_id;
    const active =
      request.query.active == undefined 
        ? null
        : !(request.query.active.toString().toLowerCase() == "false");
    const service = new ListEventsProfessorService();

    return response.json(
      await service.execute({ activeEvents : active, page, professorId })
    );
  }

  async hundleWorkLoad(request: Request, response: Response) {
    const { timePeriodInit, timePeriodEnd } = request.params;
    const classId =
      request.query.classId == undefined
        ? ""
        : request.query.classId.toString();
    const professorId =
      request.query.professorId == undefined
        ? ""
        : request.query.professorId.toString();
    const service = new ListEventsWorkLoadService();
    return response.json(
      await service.execute({
        classId,
        professorId,
        timePeriodInit,
        timePeriodEnd,
      })
    );
  }

  async hundleWorkLoadStudent(request: Request, response: Response) {
    const { timePeriodInit, timePeriodEnd, studentId} = request.params;
    const service = new ListEventsWorkLoadStudentService();
    return response.json(
      await service.execute({ id: studentId, timePeriodInit, timePeriodEnd })
    );
  }

  async hundleNextsEvents(request: Request, response: Response) {
    const { classId } = request.params;
    const page = Number(request.query.page) || 1;
    const nextEvents =
      request.query.nextEvents == undefined
        ? true
        : !(request.query.nextEvents.toString().toLowerCase() == "false");
    const serivce = new ListNextEventsClassService();
    return response.json(await serivce.execute({ classId, nextEvents, page }));
  }
}

export { AllEventsController };
