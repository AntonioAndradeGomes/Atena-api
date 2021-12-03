import moment from "moment";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma"

interface IRequest {
  id: string;
  expiredAt: string;
}

class UpdateExpiredAtAccessCodeService {

  async execute({ id, expiredAt }: IRequest) {

    let accessCode = await prismaClient.accessCode.findUnique({ where: { id } });

    if (!accessCode) {

      throw new AppError('this access code does not exist');

    }

    const diff = moment.duration(moment(new Date(expiredAt)).diff(moment(accessCode.createdAt))).asDays();

    if (diff < 2) {

      throw new AppError('the difference between the access code creation date and the expiration date must be greater than two days', 422);

    }

    accessCode = await prismaClient.accessCode.update({ where: { id }, data: { expiredAt } });

    return accessCode;

  }
}

export { UpdateExpiredAtAccessCodeService }
