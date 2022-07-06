"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDisciplineController = void 0;
const UpdateDisciplineService_1 = require("../services/UpdateDisciplineService");
class UpdateDisciplineController {
    async handle(request, response) {
        const userId = request.user_id;
        const id = request.params.id;
        const { code, name, initials, courseLoad, } = request.body;
        const service = new UpdateDisciplineService_1.UpdateDisciplineService();
        const result = await service.execute({ id, code, name, initials, courseLoad, userId });
        return response.status(200).json(result);
    }
    ;
}
exports.UpdateDisciplineController = UpdateDisciplineController;
;
