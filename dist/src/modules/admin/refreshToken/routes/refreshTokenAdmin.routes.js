"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRouter = void 0;
const express_1 = require("express");
const ensureAuthenticatedAdmin_1 = require("../../../../middlewares/ensureAuthenticatedAdmin");
const RefreshTokenAdminController_1 = require("../controllers/RefreshTokenAdminController");
const refreshTokenRouter = (0, express_1.Router)();
exports.refreshTokenRouter = refreshTokenRouter;
refreshTokenRouter.post('/', ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, new RefreshTokenAdminController_1.RefreshTokenAdminController().handle);
