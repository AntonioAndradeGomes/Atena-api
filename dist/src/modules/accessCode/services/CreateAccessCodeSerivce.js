"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccessCodeSerivce = void 0;
const moment_1 = __importDefault(require("moment"));
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateAccessCodeSerivce {
    async execute(expiredAt) {
        // TODO: melhorar o algoritmo de geração de access code e melhorar essa verificação no banco de dados
        const diff = moment_1.default
            .duration((0, moment_1.default)(new Date(expiredAt)).diff((0, moment_1.default)(new Date())))
            .asDays();
        //console.log(diff);
        if (diff < 2) {
            throw new AppError_1.AppError("the difference between the current date and the access code expiration date must be greater than 2 days", 422);
        }
        //tentar 20 vezes gerar o codigo de acesso, se não conseguir manda tentar depois
        let newCode = false;
        let tent = 0;
        let code = "";
        while (tent < 20 && !newCode) {
            code = this.genereteCode();
            const accessCodeExists = await prisma_1.default.accessCode.findUnique({
                where: { code },
            });
            if (!accessCodeExists) {
                newCode = true;
            }
            tent++;
        }
        console.log(tent);
        if (!newCode && tent >= 20) {
            throw new AppError_1.AppError("Unable to generate access code now. Try it later.");
        }
        const accessCode = await prisma_1.default.accessCode.create({
            data: { code, expiredAt },
        });
        return accessCode;
    }
    genereteCode() {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
        let code = "";
        for (let i = 0; i < 7; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            code += chars.substring(randomNumber, randomNumber + 1);
        }
        return code;
    }
}
exports.CreateAccessCodeSerivce = CreateAccessCodeSerivce;
