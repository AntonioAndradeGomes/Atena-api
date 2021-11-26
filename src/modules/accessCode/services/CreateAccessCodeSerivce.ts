import moment from "moment";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

class CreateAccessCodeSerivce {

  async execute(expiredAt : string) {

    // TODO: melhorar o algoritmo de geração de access code e melhorar essa verificação no banco de dados
    const diff = moment.duration(moment(new Date(expiredAt)).diff(moment(new Date()))).asDays();

    if(diff < 2){
      throw new AppError('the difference between the current date and the passcode expiration date must be greater than 2 days', 422);
    }
    
    let exits = true;
    let code = "";
    while(exits){
      code = this.genereteCode();
      const accessCodeExists = await prismaClient.accessCode.findUnique({where: {code}});
      if(!accessCodeExists){
        exits = false;
      }
    }
    const accessCode = await prismaClient.accessCode.create({data: {code, expiredAt}});
    return accessCode;
  }

  private genereteCode() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 7; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      code += chars.substring(randomNumber, randomNumber + 1);
    }
    return code;
  }
}

export { CreateAccessCodeSerivce }
