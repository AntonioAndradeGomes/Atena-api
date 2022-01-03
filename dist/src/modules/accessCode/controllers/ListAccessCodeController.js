"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAccessCodeController = void 0;
const ListAllAccessCodeService_1 = require("../services/ListAllAccessCodeService");
const ListByCodeAccessCodeService_1 = require("../services/ListByCodeAccessCodeService");
class ListAccessCodeController {
    async listAll(request, response) {
        const service = new ListAllAccessCodeService_1.ListAllAccessCodeService();
        return response.json(await service.execute());
    }
    async byCode(request, response) {
        const service = new ListByCodeAccessCodeService_1.ListByCodeAccessCodeService();
        const { code } = request.params;
        return response.json(await service.execute(code) || { message: "No `" + code + "` code found" });
    }
}
exports.ListAccessCodeController = ListAccessCodeController;
