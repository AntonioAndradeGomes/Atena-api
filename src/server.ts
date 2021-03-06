import "dotenv/config";
import { errors } from "celebrate";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import { AppError } from "./errors/AppError";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors());

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction ) => {
    if(err instanceof AppError){
      return response.status(err.statusCode).json({status: 'error', message: err.message});
    }
    console.log(err);
    return response.status(500).json({status: 'error', message: 'Internal server error'});
  }
)

app.listen(PORT, ()=> {
  console.log('Server in running in port 3333');
});
