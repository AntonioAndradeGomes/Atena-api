import { OAuth2Client } from "google-auth-library";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

/*
1 - pegar o idtoken, verificar e pegar os dados do usuario
2 - verificar se há usuario no banco de dados
  SIM - tipo defindo
    - autenticar e liberar o JWT com os dados do usuário 
  SIM - tipo indefindo
    - liberar os dados do usuario mas mostrar que o tipo não foi defindo
  NAO
    - cadastrar no banco de dados sem o tipo definido 
    - retornar dados do usuario com mensagem que está sem tipo definido 
*/


class AuthenticateUserService{
  
  async execute(idToken: string){
    const client = new OAuth2Client(process.env.GOOGLE_ID_CLIENT);
    const finalToken = idToken.replace('Bearer', '');
    if(!finalToken){
      throw new AppError("Não há idToken Google", 401);
    }
    const ticket = await client.verifyIdToken({
      idToken: finalToken,
      audience: process.env.GOOGLE_ID_CLIENT,
    }).catch((err) => {
      console.log(err);
      return null;
    });

    if(!ticket){
      throw new AppError("idToken Google inválido", 401);
    }
  
    const { email, name, picture } = ticket.getPayload();

    let userPrisma = await  prismaClient.user.findFirst({
      where : {
        mail: email,
      }
    });

    if(!userPrisma){
      userPrisma = await prismaClient.user.create({
        data: {
          name,
          mail: email,
          image_url: picture,
          type: "undefined",
        }
      });

      return {
        message : "undefined user type, added user",
        user : {data: userPrisma},
        code : 201,
      };
    }else if(userPrisma.type == "undefined"){
      return {
        message : "undefined user type",
        user : {data: userPrisma},
        code : 200,
      };
    }else{
      const token = sign(
        {
          user : {
            name: userPrisma.name,
            image_url: userPrisma.image_url,
            type: userPrisma.type,
            id: userPrisma.id,
          }
        },
        process.env.JWT_SECRET,
        {
          subject: userPrisma.id,
          expiresIn: "1d",
        }
      );
      return {
        message : "success",
        user : {
          data: userPrisma,
          token,
        },
        code : 200,
        
      }
    }
  }
}

export {AuthenticateUserService}
