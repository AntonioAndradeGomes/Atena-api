import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";
import { GenereteUserToken } from "../../../../provider/GenereteUserToken";
import path from 'path';
import { EmailMessenger } from "../../../../config/mail/EmailMessenger";

interface IRequest{
  mail: string;
}

class SendForgotPasswordEmailService{
  async execute({mail} : IRequest){ 
    const user = await prismaClient.user.findUnique({where: {mail}});

    if(!user){
      throw new AppError('User does not exists.');
    }
    const provider = new GenereteUserToken();
    const token = await provider.execute({userId: user.id});

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs',);

    await EmailMessenger.send({
      to: {
        mail: user.mail,
        name: user.name
      },
      subject: '[Atena] - Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        vars: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token.token}`,
        }
      }
    });
  }
}

export {SendForgotPasswordEmailService}
