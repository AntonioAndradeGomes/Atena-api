"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professorRoutes = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const CreateProfessorController_1 = require("../controllers/CreateProfessorController");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const ListAllProfessorController_1 = require("../controllers/ListAllProfessorController");
const createController = new CreateProfessorController_1.CreateProfessorController();
const listController = new ListAllProfessorController_1.ListAllProfessorController();
const professorRoutes = (0, express_1.Router)();
exports.professorRoutes = professorRoutes;
//ca cria o professor
professorRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().min(3).required(),
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(6).required(),
        registration: celebrate_1.Joi.string().min(7).required(),
    },
}), ensureAuthenticated_1.ensureAuthenticated, createController.hundle);
//listagem de professores
professorRoutes.get('/', listController.hundle);
