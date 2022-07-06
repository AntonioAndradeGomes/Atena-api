"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passRoutes = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const ForgotPasswordController_1 = require("../controllers/ForgotPasswordController");
const ResetPasswordController_1 = require("../controllers/ResetPasswordController");
const UpdatePasswordController_1 = require("../controllers/UpdatePasswordController");
const updatePass = new UpdatePasswordController_1.UpdatePasswordController();
const forgotPass = new ForgotPasswordController_1.ForgotPasswordController();
const resetPass = new ResetPasswordController_1.ResetPasswordController();
const passRoutes = (0, express_1.Router)();
exports.passRoutes = passRoutes;
//atualizar senha do user logado
passRoutes.patch("/", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        oldpassword: celebrate_1.Joi.string().min(6).required(),
        newpassword: celebrate_1.Joi.string().min(6).required(),
        newpasswordconfirmation: celebrate_1.Joi.string().required().valid(celebrate_1.Joi.ref('newpassword'))
    },
}), updatePass.hundle);
passRoutes.post("/forgot", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        mail: celebrate_1.Joi.string().email().required()
    }
}), forgotPass.hundle);
passRoutes.post("/reset", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        token: celebrate_1.Joi.string().uuid().required(),
        newpassword: celebrate_1.Joi.string().min(6).required(),
        passwordConfirmation: celebrate_1.Joi.string().min(6).required().valid(celebrate_1.Joi.ref("newpassword"))
    }
}), resetPass.hundle);
