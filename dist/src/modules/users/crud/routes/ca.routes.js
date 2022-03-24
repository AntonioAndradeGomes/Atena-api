"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caRoutes = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const CADeleteUserController_1 = require("../controllers/CADeleteUserController");
const ListAcademicCenterController_1 = require("../controllers/ListAcademicCenterController");
const listController = new ListAcademicCenterController_1.ListAcademicCenterController();
const deleteController = new CADeleteUserController_1.CADeleteProfessorController();
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
