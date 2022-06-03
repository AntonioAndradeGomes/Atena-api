"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEventsController = void 0;
const AllEventsService_1 = require("../services/AllEventsService");
const ListEventsProfessorService_1 = require("../services/ListEventsProfessorService");
const ListEventsWorkLoadService_1 = require("../services/ListEventsWorkLoadService");
class AllEventsController {
    async handle(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new AllEventsService_1.AllEventsService();
        const result = await service.execute({ page });
        return response.json(result);
    }
    async hundleProfessor(request, response) {
        const page = Number(request.query.page) || 1;
        const professorId = request.user_id;
        const allEvents = request.query.allEvents == undefined ? false : request.query.allEvents.toString().toLowerCase() == 'true';
        const activeEvents = request.query.activeEvents == undefined ? true : request.query.activeEvents.toString().toLowerCase() == 'true';
        const service = new ListEventsProfessorService_1.ListEventsProfessorService();
        return response.json(await service.execute({ activeEvents, allEvents, page, professorId, }));
    }
    async hundleWorkLoad(request, response) {
        const { timePeriodInit } = request.params;
        const classId = request.query.classId == undefined ? '' : request.query.classId.toString();
        const professorId = request.query.professorId == undefined ? '' : request.query.professorId.toString();
        ;
        const service = new ListEventsWorkLoadService_1.ListEventsWorkLoadService();
        return response.json(await service.execute({ classId, professorId, timePeriodInit }));
    }
}
exports.AllEventsController = AllEventsController;
