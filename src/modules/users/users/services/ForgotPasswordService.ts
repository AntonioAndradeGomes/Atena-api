import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";
import { GenerateTokenController } from "../../userToken/controllers/GenerateTokenController";
import EmailMessenger from "../../../../mail/EmailMessenger";
import path from "path";

interface IRequest {
  mail: string
};

class ForgotPasswordService {
  async execute({ mail }: IRequest) {
    const user = await prismaClient.user.findFirst({
      where: { mail }
    });

    if(!user) {
      throw new AppError("User dosen't exist");
    };

    const generateToken = new GenerateTokenController();
    const token = await generateToken.handle(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      "forgot_password.hbs"
    );

    const emailMessenger = new EmailMessenger();

    await emailMessenger.send({
      to: {
        name: user.name,
        mail: user.mail
      },
      subject: "[Atena] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        vars: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${token?.token}`
        }
      }
    })

  };
};

export { ForgotPasswordService };
