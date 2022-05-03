"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const CreateTaskController_1 = require("../controllers/CreateTaskController");
const DeleteTaskController_1 = require("../controllers/DeleteTaskController");
const ListRequestController_1 = require("../controllers/ListRequestController");
const UpdateRequestController_1 = require("../controllers/UpdateRequestController");
const requestRouter = (0, express_1.Router)();
exports.requestRouter = requestRouter;
const listController = new ListRequestController_1.ListTaskController();
requestRouter.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        description: celebrate_1.Joi.string().required(),
        mail: celebrate_1.Joi.string().email().required(),
        isCheck: celebrate_1.Joi.boolean().required(),
    },
}), new CreateTaskController_1.CreateTaskController().hundle);
requestRouter.get("/", listController.listAll);
requestRouter.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), listController.listById);
requestRouter.put("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        description: celebrate_1.Joi.string().required(),
        mail: celebrate_1.Joi.string().email().required(),
        isCheck: celebrate_1.Joi.boolean().required(),
    },
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), new UpdateRequestController_1.UpdateTaskController().hundle);
requestRouter.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), new DeleteTaskController_1.DeleteTaskController().hundle);
