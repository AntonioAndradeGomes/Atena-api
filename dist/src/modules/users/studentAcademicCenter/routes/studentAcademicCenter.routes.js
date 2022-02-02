"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentAcademicCenterRouter = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const StudentJoinAcademicCenterController_1 = require("../controllers/StudentJoinAcademicCenterController");
const studentAcademicCenterRouter = (0, express_1.Router)();
exports.studentAcademicCenterRouter = studentAcademicCenterRouter;
studentAcademicCenterRouter.patch("/add", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        mail: celebrate_1.Joi.string().email().required(),
    }
}), new StudentJoinAcademicCenterController_1.StudentJoinAcademicCenterController().handle);
