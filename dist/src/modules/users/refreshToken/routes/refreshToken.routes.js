"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const RefreshTokenController_1 = require("../controllers/RefreshTokenController");
const refreshTokenRouter = (0, express_1.Router)();
exports.refreshTokenRouter = refreshTokenRouter;
refreshTokenRouter.post('/', ensureAuthenticated_1.ensureAuthenticated, new RefreshTokenController_1.RefreshTokenController().handle);
