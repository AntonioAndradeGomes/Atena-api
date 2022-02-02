"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const UpdateAllDataUserService_1 = require("../services/UpdateAllDataUserService");
const UpdateUserService_1 = require("../services/UpdateUserService");
class UpdateUserController {
    async updateUser(request, response) {
        const { registration, name, password } = request.body;
        const id = request.user_id;
        const service = new UpdateUserService_1.UpdateUserService();
        return response.json(await service.execute({ id, registration, name, password }));
    }
    async updateAllDataUser(request, response) {
        const id = request.params.id;
        const { name, isStudent, isAcademicCenter, isProfessor, registration, code, caEndDate, caInitDate, password } = request.body;
        const service = new UpdateAllDataUserService_1.UpdateAllDataUserService();
        return response.json(await service.execute({ id, name, isStudent, isAcademicCenter, isProfessor, registration, code, caEndDate, caInitDate, password }));
    }
}
exports.UpdateUserController = UpdateUserController;
