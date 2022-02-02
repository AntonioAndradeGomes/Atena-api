"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRouter = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ForgotPasswordController_1 = require("../controllers/ForgotPasswordController");
const ResetPasswordController_1 = require("../controllers/ResetPasswordController");
const passwordRouter = (0, express_1.Router)();
exports.passwordRouter = passwordRouter;
const forgotPasswordController = new ForgotPasswordController_1.ForgotPasswordController();
const resetPasswordController = new ResetPasswordController_1.ResetPasswordController();
passwordRouter.post("/forgot", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        mail: celebrate_1.Joi.string().email().required()
    }
}), forgotPasswordController.handle);
passwordRouter.post("/reset", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        token: celebrate_1.Joi.string().uuid().required(),
        password: celebrate_1.Joi.string().required(),
        passwordConfirmation: celebrate_1.Joi.string().required().valid(celebrate_1.Joi.ref("password"))
    }
}), resetPasswordController.handle);
