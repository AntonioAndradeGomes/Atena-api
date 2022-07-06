"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caRoutes = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const CADeleteUserController_1 = require("../controllers/CADeleteUserController");
const CreateProfessorController_1 = require("../controllers/CreateProfessorController");
const ListAcademicCenterController_1 = require("../controllers/ListAcademicCenterController");
const listController = new ListAcademicCenterController_1.ListAcademicCenterController();
const deleteController = new CADeleteUserController_1.CADeleteProfessorController();
const createController = new CreateProfessorController_1.CreateProfessorController();
const caRoutes = (0, express_1.Router)();
exports.caRoutes = caRoutes;
//lista de ca's
caRoutes.get("/", listController.hundle);
//ca deleta o professor
caRoutes.delete("/professor/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), deleteController.hundle);
//ca cria o professor
caRoutes.post("/professor", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().min(3).required(),
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(6).required(),
        registration: celebrate_1.Joi.string().min(7).required(),
    },
}), ensureAuthenticated_1.ensureAuthenticated, createController.hundle);
