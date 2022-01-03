"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const AuthenticateUserController_1 = require("../controllers/AuthenticateUserController");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/login', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    }
}), new AuthenticateUserController_1.AuthenticateUserController().handle);
