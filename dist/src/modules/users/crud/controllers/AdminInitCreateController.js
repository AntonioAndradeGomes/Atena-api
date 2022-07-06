"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInitCreateController = void 0;
const AdminInitCreateService_1 = require("../services/AdminInitCreateService");
class AdminInitCreateController {
    async hundle(request, response) {
        const { jwtsecret } = request.body;
        const service = new AdminInitCreateService_1.AdminInitCreateService();
        return response.json(await service.execute({ jwtsecret }));
    }
}
exports.AdminInitCreateController = AdminInitCreateController;
