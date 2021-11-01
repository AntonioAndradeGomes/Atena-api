import "dotenv/config";

import { errors } from "celebrate";

import cors from "cors";

import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import { router } from "./routes";

import { AppError } from "./errors/AppError";

const app = express();

app.use(express.static(__dirname + '/../front'));

app.use(cors());

app.use(express.json());

app.use(router);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction ) => {
    if(err instanceof AppError){
      return response.status(err.statusCode).json({status: 'error', message: err.message});
    }
    console.log(err);
    return response.status(500).json({status: 'error', message: 'Internal server error'});
  }
)

app.listen(3333, ()=> console.log('Server in running in port 3333'));
