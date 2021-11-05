import { Router } from "express";
import { AllDisciplineController } from "../controllers/AllDisciplinesController";
import { CreateDisciplineController } from "../controllers/CreateDisciplineController";
import { DeleteDisciplineController } from "../controllers/DeleteDisciplineController";
import { RetrieveDisciplineController } from "../controllers/RetrieveDisciplineController";
import { UpdateDisciplineController } from "../controllers/UpdateDisciplineController";

const disciplineRouter = Router();

disciplineRouter.get("/", new AllDisciplineController().hundle);
disciplineRouter.post("/", new CreateDisciplineController().hundle);
disciplineRouter.get("/:id", new RetrieveDisciplineController().hundle);
disciplineRouter.put("/:id", new UpdateDisciplineController().hundle);
disciplineRouter.patch("/:id", new UpdateDisciplineController().hundle);
disciplineRouter.delete("/:id", new DeleteDisciplineController().hundle);

export { disciplineRouter };
