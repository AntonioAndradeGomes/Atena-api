import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import prismaClient from "../prisma";

export async function isStudent(request: Request, response: Response, next: NextFunction) {
  const idUser = request.user_id;
  const {  isStudent } = await prismaClient.user.findUnique({
    where: {
      id: idUser,

    }, select: {
      isStudent: true,
    }
  });
  if(!isStudent){
    throw new AppError('User is not a student, therefore cannot use this feature.', 401)
  }
  return next();
}
