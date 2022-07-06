"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professorRoutes = void 0;
const express_1 = require("express");
const ListAllProfessorController_1 = require("../controllers/ListAllProfessorController");
const listController = new ListAllProfessorController_1.ListAllProfessorController();
const professorRoutes = (0, express_1.Router)();
exports.professorRoutes = professorRoutes;
//listagem de professores
professorRoutes.get('/', listController.hundle);
