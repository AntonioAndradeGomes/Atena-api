"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const AllEventsController_1 = require("../controllers/AllEventsController");
const ProfessorCreateEventController_1 = require("../controllers/ProfessorCreateEventController");
const RetrieveEventController_1 = require("../controllers/RetrieveEventController");
const ProfessorUpdateEventController_1 = require("../controllers/ProfessorUpdateEventController");
const celebrate_1 = require("celebrate");
const ProfessorDeleteEventController_1 = require("../controllers/ProfessorDeleteEventController");
const ensureAuthenticated_1 = require("../../../middlewares/ensureAuthenticated");
const AdminCreateEventController_1 = require("../controllers/AdminCreateEventController");
const AdminUpdateEventController_1 = require("../controllers/AdminUpdateEventController");
const AdminDeleteEventController_1 = require("../controllers/AdminDeleteEventController");
const eventRouter = (0, express_1.Router)();
exports.eventRouter = eventRouter;
const controllerList = new AllEventsController_1.AllEventsController();
eventRouter.get("/", controllerList.hundle);
eventRouter.get("/professor", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: {
        page: celebrate_1.Joi.number(),
        allEvents: celebrate_1.Joi.boolean().required(),
        activeEvents: celebrate_1.Joi.boolean().required(),
    },
}), controllerList.hundleProfessor);
eventRouter.get("/workload/general/:timePeriodInit/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        timePeriodInit: celebrate_1.Joi.date().required(),
    },
    [celebrate_1.Segments.QUERY]: {
        classId: celebrate_1.Joi.string().uuid(),
        professorId: celebrate_1.Joi.string().uuid(),
    },
}), controllerList.hundleWorkLoad);
eventRouter.get("/workload/student/:timePeriodInit/", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        timePeriodInit: celebrate_1.Joi.date().required(),
    },
    [celebrate_1.Segments.QUERY]: {
        classId: celebrate_1.Joi.string().uuid(),
        professorId: celebrate_1.Joi.string().uuid(),
    },
}), controllerList.hundleWorkLoadStudent);
eventRouter.get("/next/:classId", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        classId: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.QUERY]: {
        page: celebrate_1.Joi.number(),
        nextEvents: celebrate_1.Joi.boolean(),
    },
}), controllerList.hundleNextsEvents);
eventRouter.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), new RetrieveEventController_1.RetrieveEventController().hundle);
eventRouter.post("/professor", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        title: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        isActive: celebrate_1.Joi.boolean().required(),
        difficultyLevel: celebrate_1.Joi.number().integer().min(1).max(5).required(),
        initDate: celebrate_1.Joi.date().required(),
        endDate: celebrate_1.Joi.date().required(),
        classId: celebrate_1.Joi.string().uuid().required(),
    },
}), new ProfessorCreateEventController_1.ProfessorCreateEventController().hundle);
eventRouter.post("/admin", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        title: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        isActive: celebrate_1.Joi.boolean().required(),
        difficultyLevel: celebrate_1.Joi.number().integer().min(1).max(5).required(),
        initDate: celebrate_1.Joi.date().required(),
        endDate: celebrate_1.Joi.date().required(),
        classId: celebrate_1.Joi.string().uuid().required(),
    },
}), new AdminCreateEventController_1.AdminCreateEventController().hundle);
//o professor so pode alterar o evento dele
eventRouter.put("/professor/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        title: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        isActive: celebrate_1.Joi.boolean().required(),
        difficultyLevel: celebrate_1.Joi.number().integer().min(1).max(5).required(),
        initDate: celebrate_1.Joi.date().required(),
        endDate: celebrate_1.Joi.date().required(),
        classId: celebrate_1.Joi.string().uuid().required(),
    },
}), new ProfessorUpdateEventController_1.ProfessorUpdateEventController().hundle);
eventRouter.put("/admin/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        title: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        isActive: celebrate_1.Joi.boolean().required(),
        difficultyLevel: celebrate_1.Joi.number().integer().min(1).max(5).required(),
        initDate: celebrate_1.Joi.date().required(),
        endDate: celebrate_1.Joi.date().required(),
        classId: celebrate_1.Joi.string().uuid().required(),
    },
}), new AdminUpdateEventController_1.AdminUpdateEventController().hundle);
//o professor só pode deletar o evento associado a ele
eventRouter.delete("/professor/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required(),
    },
}), new ProfessorDeleteEventController_1.ProfessorDeleteEventController().hundle);
eventRouter.delete("/admin/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required(),
    },
}), new AdminDeleteEventController_1.AdminDeleteEventController().hundle);
