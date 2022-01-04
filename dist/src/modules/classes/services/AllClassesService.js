"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllClassesService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllClassesService {
    async execute() {
        const classes = prisma_1.default.class.findMany({ include: { professor: true, academicCenter: true, discipline: true, } });
        return classes;
    }
    ;
}
exports.AllClassesService = AllClassesService;
;
