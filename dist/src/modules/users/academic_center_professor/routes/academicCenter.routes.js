"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicCenterRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const isAcademicCenter_1 = require("../../../../middlewares/isAcademicCenter");
const CreateProfessorController_1 = require("../controllers/CreateProfessorController");
const DeleteProfessorController_1 = require("../controllers/DeleteProfessorController");
const ListProfessorController_1 = require("../controllers/ListProfessorController");
const UpdateProfessorController_1 = require("../controllers/UpdateProfessorController");
const academicCenterRouter = (0, express_1.Router)();
exports.academicCenterRouter = academicCenterRouter;
const createProfessorController = new CreateProfessorController_1.CreateProfessorController();
const listProfessorController = new ListProfessorController_1.ListProfessorController();
const updateProfessorController = new UpdateProfessorController_1.UpdateProfessorController();
const deleteProfessorController = new DeleteProfessorController_1.DeleteProfessorController();
academicCenterRouter.post("/", ensureAuthenticated_1.ensureAuthenticated, isAcademicCenter_1.isAcademicCenter, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        mail: celebrate_1.Joi.string().email().required(),
        registration: celebrate_1.Joi.string().required(),
    },
}), createProfessorController.create);
academicCenterRouter.get("/", listProfessorController.listAll);
academicCenterRouter.get("/byid/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), listProfessorController.listById);
academicCenterRouter.get("/byuser", ensureAuthenticated_1.ensureAuthenticated, isAcademicCenter_1.isAcademicCenter, listProfessorController.listByUser);
academicCenterRouter.patch("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), ensureAuthenticated_1.ensureAuthenticated, isAcademicCenter_1.isAcademicCenter, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        registration: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required()
    },
}), updateProfessorController.update);
academicCenterRouter.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), ensureAuthenticated_1.ensureAuthenticated, isAcademicCenter_1.isAcademicCenter, deleteProfessorController.delete);
