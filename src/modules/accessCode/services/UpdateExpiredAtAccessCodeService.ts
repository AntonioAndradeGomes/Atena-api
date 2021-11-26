import moment from "moment";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma"

interface IRequest {
  code: string;
  expiredAt: string;
}

class UpdateExpiredAtAccessCodeService {

  async execute({ code, expiredAt }: IRequest) {

    let accessCode = await prismaClient.accessCode.findUnique({ where: { code } });

    if (!accessCode) {

      throw new AppError('this access code does not exist');

    }

    const diff = moment.duration(moment(new Date(expiredAt)).diff(moment(accessCode.createdAt))).asDays();

    if (diff < 2) {

      throw new AppError('the difference between the access code creation date and the expiration date must be greater than two days', 422);

    }

    accessCode = await prismaClient.accessCode.update({ where: { code }, data: { expiredAt } });

    return accessCode;

  }
}

export { UpdateExpiredAtAccessCodeService }
