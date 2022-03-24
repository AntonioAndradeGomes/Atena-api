"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentJoinCa = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const StudentJoinCaController_1 = require("../controllers/StudentJoinCaController");
const UpdateDatesCAController_1 = require("../controllers/UpdateDatesCAController");
const RemoveStudentCAController_1 = require("../controllers/RemoveStudentCAController");
const studentJoinCa = (0, express_1.Router)();
exports.studentJoinCa = studentJoinCa;
studentJoinCa.patch('/join', ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        caEndDate: celebrate_1.Joi.date().required(),
        caInitDate: celebrate_1.Joi.date().required(),
    },
}), new StudentJoinCaController_1.StudentJoinCaController().hundle);
studentJoinCa.patch('/update', ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        caEndDate: celebrate_1.Joi.date().required(),
        caInitDate: celebrate_1.Joi.date().required(),
    },
}), new UpdateDatesCAController_1.UpdateDatesCAController().hundle);
studentJoinCa.delete('/', ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), new RemoveStudentCAController_1.RemoveStudentCAController().hundle);
