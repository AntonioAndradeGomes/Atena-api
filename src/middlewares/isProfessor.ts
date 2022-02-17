import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import prismaClient from "../prisma";

export async function isProfessor(request: Request, response: Response, next: NextFunction) {
  const idUser = request.user_id;
  const {  id } = await prismaClient.user.findUnique({
    where: {
      id: idUser,

    }
  });
  if(!id){
    throw new AppError('User is not a professor, therefore cannot use this feature.', 401)
  }
  return next();
}
