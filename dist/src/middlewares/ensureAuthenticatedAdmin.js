"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticatedAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../errors/AppError");
function ensureAuthenticatedAdmin(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        throw new AppError_1.AppError("token not provided", 401);
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_ADMIN);
        request.user_id = sub;
        return next();
    }
    catch (err) {
        throw new AppError_1.AppError("token invalid", 401);
    }
}
exports.ensureAuthenticatedAdmin = ensureAuthenticatedAdmin;
