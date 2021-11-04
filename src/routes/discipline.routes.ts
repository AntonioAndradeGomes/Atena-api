import { Router } from "express";
import { AllDisciplineController } from "../modules/disciplines/controllers/AllDisciplinesController";
import { CreateDisciplineController } from "../modules/disciplines/controllers/CreateDisciplineController";
import { RetrieveDisciplineController } from "../modules/disciplines/controllers/RetrieveDisciplineController";
import { UpdateDisciplineController } from "../modules/disciplines/controllers/UpdateDisciplineController";
import { DeleteDisciplineController } from "../modules/disciplines/controllers/DeleteDisciplineController";

const disciplineRouter = Router();

disciplineRouter.get("/", new AllDisciplineController().hundle);
disciplineRouter.post("/", new CreateDisciplineController().hundle);
disciplineRouter.get("/:id", new RetrieveDisciplineController().hundle);
disciplineRouter.put("/:id", new UpdateDisciplineController().hundle);
disciplineRouter.delete("/:id", new DeleteDisciplineController().hundle);

export { disciplineRouter };
