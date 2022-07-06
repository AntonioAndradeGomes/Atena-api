import {Request, Response} from "express";
import { StudentJoinsTheClassSerivice } from "../services/StudentJoinsTheClassSerivice";

class StudentJoinsTheClassController{

  async hundle(request : Request, response: Response){
    const studentId = request.user_id;
    const {classId} = request.body;
    const service = new StudentJoinsTheClassSerivice();
    return response.status(201).json(await service.execute({studentId, classId}));
  }
  
}

export {StudentJoinsTheClassController}

