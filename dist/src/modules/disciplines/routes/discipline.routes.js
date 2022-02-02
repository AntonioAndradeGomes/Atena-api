"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplineRouter = void 0;
const express_1 = require("express");
const AllDisciplinesController_1 = require("../controllers/AllDisciplinesController");
const CreateDisciplineController_1 = require("../controllers/CreateDisciplineController");
const RetrieveDisciplineController_1 = require("../controllers/RetrieveDisciplineController");
const UpdateDisciplineController_1 = require("../controllers/UpdateDisciplineController");
const DeleteDisciplineController_1 = require("../controllers/DeleteDisciplineController");
const celebrate_1 = require("celebrate");
const ensureAuthenticated_1 = require("../../../middlewares/ensureAuthenticated");
const isAcademicCenter_1 = require("../../../middlewares/isAcademicCenter");
const disciplineRouter = (0, express_1.Router)();
exports.disciplineRouter = disciplineRouter;
disciplineRouter.get("/", new AllDisciplinesController_1.AllDisciplineController().handle);
disciplineRouter.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        code: celebrate_1.Joi.string().required(),
        name: celebrate_1.Joi.string().required(),
        initials: celebrate_1.Joi.string().required(),
        courseLoad: celebrate_1.Joi.number().required()
    }
}), ensureAuthenticated_1.ensureAuthenticated, isAcademicCenter_1.isAcademicCenter, new CreateDisciplineController_1.CreateDisciplineController().handle);
disciplineRouter.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    },
    [celebrate_1.Segments.BODY]: {
        code: celebrate_1.Joi.string().required(),
        name: celebrate_1.Joi.string().required(),
        initials: celebrate_1.Joi.string().required(),
        courseLoad: celebrate_1.Joi.number().required()
    }
}), new RetrieveDisciplineController_1.RetrieveDisciplineController().handle);
disciplineRouter.put("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    },
    [celebrate_1.Segments.BODY]: {
        code: celebrate_1.Joi.string().required(),
        name: celebrate_1.Joi.string().required(),
        initials: celebrate_1.Joi.string().required(),
        courseLoad: celebrate_1.Joi.number().required()
    }
}), ensureAuthenticated_1.ensureAuthenticated, isAcademicCenter_1.isAcademicCenter, new UpdateDisciplineController_1.UpdateDisciplineController().handle);
disciplineRouter.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), ensureAuthenticated_1.ensureAuthenticated, isAcademicCenter_1.isAcademicCenter, new DeleteDisciplineController_1.DeleteDisciplineController().handle);
