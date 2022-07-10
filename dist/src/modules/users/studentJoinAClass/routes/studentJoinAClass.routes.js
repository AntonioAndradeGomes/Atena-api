"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentJoinAClass = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ListStudentOnClassController_1 = require("../controllers/ListStudentOnClassController");
const AdminAddsStudentToClassController_1 = require("../controllers/AdminAddsStudentToClassController");
const AdminRemoveStudentFromClassController_1 = require("../controllers/AdminRemoveStudentFromClassController");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const StudentJoinsTheClassController_1 = require("../controllers/StudentJoinsTheClassController");
const StudentWithdrawsFromClassController_1 = require("../controllers/StudentWithdrawsFromClassController");
const ListStudentClassesController_1 = require("../controllers/ListStudentClassesController");
const listController = new ListStudentOnClassController_1.ListStudentOnClassController();
const adminAddController = new AdminAddsStudentToClassController_1.AdminAddsStudentToClassController();
const adminRemoveController = new AdminRemoveStudentFromClassController_1.AdminRemoveStudentFromClassController();
const studentAddController = new StudentJoinsTheClassController_1.StudentJoinsTheClassController();
const studentRemoveController = new StudentWithdrawsFromClassController_1.StudentWithdrawsFromClassController();
const studentClasses = new ListStudentClassesController_1.ListStudentClassesController();
const studentJoinAClass = (0, express_1.Router)();
exports.studentJoinAClass = studentJoinAClass;
//lista de relações entre estudantes e turma
studentJoinAClass.get("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        page: celebrate_1.Joi.number(),
    },
}), listController.handle);
//estudante lista suas turmas
studentJoinAClass.get("/student/", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        active: celebrate_1.Joi.boolean(),
        page: celebrate_1.Joi.number(),
    },
}), studentClasses.hundle);
//admin adiciona estudante na turma
studentJoinAClass.post("/admin", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        classId: celebrate_1.Joi.string().uuid().required(),
        studentId: celebrate_1.Joi.string().uuid().required(),
    },
}), adminAddController.hundle);
//admin remove estudante de uma turma
studentJoinAClass.delete("/admin", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        classId: celebrate_1.Joi.string().uuid().required(),
        studentId: celebrate_1.Joi.string().uuid().required(),
    },
}), adminRemoveController.hundle);
//estudante entra na turma
studentJoinAClass.post("/student", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        classId: celebrate_1.Joi.string().uuid().required(),
    },
}), studentAddController.hundle);
//estudante sai da turma
studentJoinAClass.delete("/student/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), studentRemoveController.hundle);
