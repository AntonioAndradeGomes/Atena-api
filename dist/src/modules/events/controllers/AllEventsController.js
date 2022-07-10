"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEventsController = void 0;
const AllEventsService_1 = require("../services/AllEventsService");
const ListEventsProfessorService_1 = require("../services/ListEventsProfessorService");
const ListEventsWorkLoadService_1 = require("../services/ListEventsWorkLoadService");
const ListEventsWorkLoadStudentService_1 = require("../services/ListEventsWorkLoadStudentService");
const ListNextEventsClassService_1 = require("../services/ListNextEventsClassService");
class AllEventsController {
    async hundle(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new AllEventsService_1.AllEventsService();
        const result = await service.execute({ page });
        return response.json(result);
    }
    async hundleProfessor(request, response) {
        const page = Number(request.query.page) || 1;
        const professorId = request.user_id;
        const allEvents = request.query.allEvents == undefined
            ? false
            : request.query.allEvents.toString().toLowerCase() == "true";
        const activeEvents = request.query.activeEvents == undefined
            ? true
            : request.query.activeEvents.toString().toLowerCase() == "true";
        const service = new ListEventsProfessorService_1.ListEventsProfessorService();
        return response.json(await service.execute({ activeEvents, allEvents, page, professorId }));
    }
    async hundleWorkLoad(request, response) {
        const { timePeriodInit, timePeriodEnd } = request.params;
        const classId = request.query.classId == undefined
            ? ""
            : request.query.classId.toString();
        const professorId = request.query.professorId == undefined
            ? ""
            : request.query.professorId.toString();
        const service = new ListEventsWorkLoadService_1.ListEventsWorkLoadService();
        return response.json(await service.execute({
            classId,
            professorId,
            timePeriodInit,
            timePeriodEnd,
        }));
    }
    async hundleWorkLoadStudent(request, response) {
        const id = request.user_id;
        const { timePeriodInit, timePeriodEnd } = request.params;
        const service = new ListEventsWorkLoadStudentService_1.ListEventsWorkLoadStudentService();
        return response.json(await service.execute({ id, timePeriodInit, timePeriodEnd }));
    }
    async hundleNextsEvents(request, response) {
        const { classId } = request.params;
        const page = Number(request.query.page) || 1;
        const nextEvents = request.query.nextEvents == undefined
            ? true
            : !(request.query.nextEvents.toString().toLowerCase() == "false");
        const serivce = new ListNextEventsClassService_1.ListNextEventsClassService();
        return response.json(await serivce.execute({ classId, nextEvents, page }));
    }
}
exports.AllEventsController = AllEventsController;
