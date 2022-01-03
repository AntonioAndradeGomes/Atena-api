"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentClassRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const isStudent_1 = require("../../../../middlewares/isStudent");
const AddStudentToClassController_1 = require("../controllers/AddStudentToClassController");
const ListStudentOnClassServiceController_1 = require("../controllers/ListStudentOnClassServiceController");
const RemoveStudentToClassController_1 = require("../controllers/RemoveStudentToClassController");
const studentClassRouter = (0, express_1.Router)();
exports.studentClassRouter = studentClassRouter;
studentClassRouter.get('/', new ListStudentOnClassServiceController_1.ListStudentOnClassServiceController().handle);
studentClassRouter.post('/', ensureAuthenticated_1.ensureAuthenticated, isStudent_1.isStudent, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        classId: celebrate_1.Joi.string().uuid().required(),
    }
}), new AddStudentToClassController_1.AddStudentToClassController().handle);
studentClassRouter.delete('/', ensureAuthenticated_1.ensureAuthenticated, isStudent_1.isStudent, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        classId: celebrate_1.Joi.string().uuid().required(),
    }
}), new RemoveStudentToClassController_1.RemoveStudentToClassController().handle);
