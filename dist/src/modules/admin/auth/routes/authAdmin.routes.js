"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdminRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const AuthAdminController_1 = require("../controllers/AuthAdminController");
const authAdminRouter = (0, express_1.Router)();
exports.authAdminRouter = authAdminRouter;
authAdminRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    }
}), new AuthAdminController_1.AuthAdminController().handle);
