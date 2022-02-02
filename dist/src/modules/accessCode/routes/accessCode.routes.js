"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessCodeRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const CreateAccessCodeController_1 = require("../controllers/CreateAccessCodeController");
const DeleteAccessCodeController_1 = require("../controllers/DeleteAccessCodeController");
const ListAccessCodeController_1 = require("../controllers/ListAccessCodeController");
const UpdateAccessCodeController_1 = require("../controllers/UpdateAccessCodeController");
const accessCodeRouter = (0, express_1.Router)();
exports.accessCodeRouter = accessCodeRouter;
const listAccessCode = new ListAccessCodeController_1.ListAccessCodeController();
accessCodeRouter.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        expiredAt: celebrate_1.Joi.string().isoDate().required(),
    },
}), new CreateAccessCodeController_1.CreateAccessCodeController().create);
accessCodeRouter.get("/all/", listAccessCode.listAll);
accessCodeRouter.get("/bycode/:code", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        code: celebrate_1.Joi.string().required(),
    },
}), listAccessCode.byCode);
accessCodeRouter.patch("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        code: celebrate_1.Joi.string().required(),
    },
    [celebrate_1.Segments.BODY]: {
        expiredAt: celebrate_1.Joi.string().isoDate().required(),
    },
}), new UpdateAccessCodeController_1.UpdateAccessCodeController().execute);
accessCodeRouter.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required(),
    },
}), new DeleteAccessCodeController_1.DeleteAccessCodeController().delete);
