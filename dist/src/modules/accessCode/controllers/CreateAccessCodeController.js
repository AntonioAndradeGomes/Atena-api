"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccessCodeController = void 0;
const CreateAccessCodeSerivce_1 = require("../services/CreateAccessCodeSerivce");
class CreateAccessCodeController {
    async create(request, response) {
        const service = new CreateAccessCodeSerivce_1.CreateAccessCodeSerivce();
        const { expiredAt } = request.body;
        return response.status(201).json(await service.execute(expiredAt));
    }
}
exports.CreateAccessCodeController = CreateAccessCodeController;
