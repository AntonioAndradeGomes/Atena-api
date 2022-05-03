"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClassesController = void 0;
const MyClassesService_1 = require("../services/MyClassesService");
class MyClassesController {
    async hundle(request, response) {
        const page = Number(request.query.page) || 1;
        const professorId = request.user_id;
        const service = new MyClassesService_1.MyClassesService();
        return response.status(200).json(await service.execute({ page, professorId }));
    }
    ;
}
exports.MyClassesController = MyClassesController;
;
