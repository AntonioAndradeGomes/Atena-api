"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDisciplineController = void 0;
const DeleteDisciplineService_1 = require("../services/DeleteDisciplineService");
class DeleteDisciplineController {
    async handle(request, response) {
        const id = request.params.id;
        const userId = request.user_id;
        const service = new DeleteDisciplineService_1.DeleteDisciplineService();
        const result = await service.execute({ idUser: userId, idDiscipline: id, });
        return response.status(204).json(result);
    }
    ;
}
exports.DeleteDisciplineController = DeleteDisciplineController;
;
