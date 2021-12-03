import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IResponse {
  error: boolean;
  message: string;
}

class DeleteAccessCodeService {
  async execute(id: string) {
    const code = (await prismaClient.accessCode
      .delete({ where: { id } })
      .then((_) => {
        return {
          error: false,
          message: "The access code was successfully deleted.",
        } as IResponse;
      })
      .catch((err) => {
        if (err.meta.cause == "Record to delete does not exist.") {
          return {
            error: true,
            message: "Access Code to delete does not exist.",
          } as IResponse;
        }
        return {
          error: true,
          message: "The Access Code cannot be deleted now, try later.",
        } as IResponse;
      })) as IResponse;
    if (code.error) {
      throw new AppError(code.message);
    }
    return {message: code.message};
  }
}

export { DeleteAccessCodeService };
