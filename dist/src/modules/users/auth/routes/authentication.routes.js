"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRoutes = void 0;
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const AuthenticationController_1 = require("../controllers/AuthenticationController");
const RefrashTokenController_1 = require("../controllers/RefrashTokenController");
const authController = new AuthenticationController_1.AuthenticationController();
const authenticationRoutes = (0, express_1.Router)();
exports.authenticationRoutes = authenticationRoutes;
authenticationRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(6).required(),
    },
}), authController.hundle);
authenticationRoutes.post("/refresh", ensureAuthenticated_1.ensureAuthenticated, new RefrashTokenController_1.RefreshTokenController().hundle);
