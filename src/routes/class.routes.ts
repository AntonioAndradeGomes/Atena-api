import { Router } from "express";
import { AllClassesController } from "../modules/classes/controllers/AllClassesController";
import { CreateClassController } from "../modules/classes/controllers/CreateClassController";
import { DeleteClassController } from "../modules/classes/controllers/DeleteClassController";
import { RetrieveClassController } from "../modules/classes/controllers/RetrieveClasseController";
import { UpdateClassController } from "../modules/classes/controllers/UpdateClassController";

const classRouter = Router();

classRouter.get("/", new AllClassesController().hundle);
classRouter.post("/", new CreateClassController().hundle);
classRouter.get("/:id", new RetrieveClassController().hundle);
classRouter.put("/:id", new UpdateClassController().hundle);
classRouter.patch("/:id", new UpdateClassController().hundle);
classRouter.delete("/:id", new DeleteClassController().hundle);

export { classRouter };
