import moment from "moment";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class CreateAccessCodeSerivce {
  async execute(expiredAt: string) {
    // TODO: melhorar o algoritmo de geração de access code e melhorar essa verificação no banco de dados
    const diff = moment
      .duration(moment(new Date(expiredAt)).diff(moment(new Date())))
      .asDays();

  console.log(diff);

    if (diff < 2) {
      throw new AppError(
        "the difference between the current date and the access code expiration date must be greater than 2 days",
        422
      );
    }

    //tentar 20 vezes gerar o codigo de acesso, se não conseguir manda tentar depois
    let newCode = false;
    let tent = 0;
    let code = "";
    while (tent < 20 && !newCode) {
      code = this.genereteCode();
      const accessCodeExists = await prismaClient.accessCode.findUnique({
        where: { code },
      });
      if (!accessCodeExists) {
        newCode = true;
      }
      tent++;
    }
    console.log(tent);
    if (!newCode && tent >= 20) {
      throw new AppError("Unable to generate access code now. Try it later.");
    }
    const accessCode = await prismaClient.accessCode.create({
      data: { code, expiredAt },
    });
    return accessCode;
  }

  private genereteCode() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 7; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      code += chars.substring(randomNumber, randomNumber + 1);
    }
    return code;
  }
}

export { CreateAccessCodeSerivce };
