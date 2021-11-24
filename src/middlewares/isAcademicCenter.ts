import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import prismaClient from "../prisma";

export async function isAcademicCenter(request: Request, response: Response, next: NextFunction) {
  const idUser = request.user_id;
  const {  isAcademicCenter } = await prismaClient.user.findUnique({
    where: {
      id: idUser,

    }, select: {
      isAcademicCenter: true,
    }
  });
  if(!isAcademicCenter){
    throw new AppError('User is not from the academic center, therefore cannot use this feature.', 401)
  }
  return next();
}
