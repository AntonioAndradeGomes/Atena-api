"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../middlewares/ensureAuthenticated");
const AllClassesController_1 = require("../controllers/AllClassesController");
const CreateClassController_1 = require("../controllers/CreateClassController");
const DeleteClassController_1 = require("../controllers/DeleteClassController");
const MyClassesController_1 = require("../controllers/MyClassesController");
const RetrieveClasseController_1 = require("../controllers/RetrieveClasseController");
const UpdateClassController_1 = require("../controllers/UpdateClassController");
const classRouter = (0, express_1.Router)();
exports.classRouter = classRouter;
classRouter.get("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: {
        active: celebrate_1.Joi.boolean(),
        page: celebrate_1.Joi.number(),
    },
}), new AllClassesController_1.AllClassesController().hundle);
classRouter.get("/myClass", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: {
        active: celebrate_1.Joi.boolean(),
    },
}), new MyClassesController_1.MyClassesController().hundle);
classRouter.post("/", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        academicYear: celebrate_1.Joi.string().required(),
        period: celebrate_1.Joi.string().required(),
        isRegularClass: celebrate_1.Joi.boolean().required(),
        professorId: celebrate_1.Joi.string().uuid().required(),
        disciplineId: celebrate_1.Joi.string().uuid().required(),
        dateInitClass: celebrate_1.Joi.date().required(),
        dateEndClass: celebrate_1.Joi.date().required(),
    },
}), new CreateClassController_1.CreateClassController().hundle);
classRouter.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), new RetrieveClasseController_1.RetrieveClassController().hundle);
classRouter.put("/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        academicYear: celebrate_1.Joi.string().required(),
        period: celebrate_1.Joi.string().required(),
        isRegularClass: celebrate_1.Joi.boolean().required(),
        professorId: celebrate_1.Joi.string().uuid().required(),
        disciplineId: celebrate_1.Joi.string().uuid().required(),
        dateInitClass: celebrate_1.Joi.date().required(),
        dateEndClass: celebrate_1.Joi.date().required(),
    },
}), new UpdateClassController_1.UpdateClassController().hundle);
classRouter.delete("/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), new DeleteClassController_1.DeleteClassController().hundle);
