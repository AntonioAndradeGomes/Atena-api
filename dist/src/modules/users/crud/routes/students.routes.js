"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const CreateStudentController_1 = require("../controllers/CreateStudentController");
const ListAllStudentsController_1 = require("../controllers/ListAllStudentsController");
const createController = new CreateStudentController_1.CreateStudentController();
const listController = new ListAllStudentsController_1.ListAllStudentsController();
const studentRoutes = (0, express_1.Router)();
exports.studentRoutes = studentRoutes;
//estudante se cria no sistema usando o code
studentRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().min(3).required(),
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(6).required(),
        registration: celebrate_1.Joi.string().min(7).required(),
        code: celebrate_1.Joi.string().required(),
    },
}), createController.hundle);
//listagem de estudantes
studentRoutes.get('/', listController.hundle);
