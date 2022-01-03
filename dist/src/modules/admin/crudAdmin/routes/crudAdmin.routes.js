"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudAdminRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticatedAdmin_1 = require("../../../../middlewares/ensureAuthenticatedAdmin");
const CreateAdminController_1 = require("../controllers/CreateAdminController");
const DeleteAdminController_1 = require("../controllers/DeleteAdminController");
const ListAdminController_1 = require("../controllers/ListAdminController");
const UpdateAdminController_1 = require("../controllers/UpdateAdminController");
const crudAdminRouter = (0, express_1.Router)();
exports.crudAdminRouter = crudAdminRouter;
const listController = new ListAdminController_1.ListAdminController();
crudAdminRouter.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        username: celebrate_1.Joi.string().min(6).required(),
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
}), ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, new CreateAdminController_1.CreateAdminController().hundle);
crudAdminRouter.get("/", ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, listController.listAll);
crudAdminRouter.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, listController.listById);
crudAdminRouter.put("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        username: celebrate_1.Joi.string().min(6).required(),
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.required(),
    },
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, new UpdateAdminController_1.UpdateAdminController().hundle);
crudAdminRouter.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, new DeleteAdminController_1.DeleteAdminController().execute);
