"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNextEventsClassService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class ListNextEventsClassService {
    async execute({ classId, nextEvents, page }) {
        const classExists = await prisma_1.default.class.findUnique({
            where: { id: classId },
        });
        if (!classExists) {
            throw new AppError_1.AppError("Class not exists");
        }
        const skip = page * 10 - 10;
        const like = `${classId}%`;
        if (!nextEvents) {
            const events = await prisma_1.default.$queryRaw `
        select * from events e 
        where e."classId" like ${like}
        and e."endDate"  < current_date 
        order by e."endDate" desc
        limit 10 offset ${skip}
      `;
            const countEvents = await prisma_1.default.$queryRaw `
        select count(*) as total from events e 
        where e."classId" like ${like}
        and e."endDate"  < current_date 
      `;
            const countValue = parseInt(countEvents[0]["total"] + "");
            const lastPage = Math.ceil(countValue / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                message: `listing the past events of the class with the id ${classId} and the name ${classExists.name}`,
                actualPage: page,
                actualLength: events.length,
                total: countValue,
                lastPage,
                prev,
                next,
                classId,
                nextEvents,
                events,
            };
        }
        const events = await prisma_1.default.$queryRaw `
        select * from events e 
        where e."classId" like ${like}
        and e."endDate"  >= current_date 
        order by e."endDate" asc
        limit 10 offset ${skip}
      `;
        const countEvents = await prisma_1.default.$queryRaw `
        select count(*) as total from events e 
        where e."classId" like ${like}
        and e."endDate"  >= current_date 
      `;
        const countValue = parseInt(countEvents[0]["total"] + "");
        const lastPage = Math.ceil(countValue / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            message: `listing upcoming class events with id ${classId} and name ${classExists.name}`,
            actualPage: page,
            actualLength: events.length,
            total: countValue,
            lastPage,
            prev,
            next,
            classId,
            nextEvents,
            events,
        };
    }
}
exports.ListNextEventsClassService = ListNextEventsClassService;
