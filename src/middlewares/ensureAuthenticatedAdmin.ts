import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload{
  sub: string;
}

export function ensureAuthenticatedAdmin(request: Request, response: Response, next: NextFunction){
  const authToken = request.headers.authorization;
  
  if(!authToken){
    throw new AppError("token not provided", 401);
  }

  const [,token] = authToken.split(" ");

  try{
    const { sub } = verify(token, process.env.JWT_SECRET_ADMIN) as IPayload;
    request.user_id = sub;
    return next();
  }catch(err){
    throw new AppError("token invalid", 401);
  }
}
