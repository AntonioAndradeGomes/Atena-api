import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateAccessCodeController } from "../controllers/CreateAccessCodeController";
import { DeleteAccessCodeController } from "../controllers/DeleteAccessCodeController";
import { ListAccessCodeController } from "../controllers/ListAccessCodeController";
import { UpdateAccessCodeController } from "../controllers/UpdateAccessCodeController";

const accessCodeRouter = Router();
const listAccessCode = new ListAccessCodeController();

accessCodeRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      expiredAt: Joi.string().isoDate().required(),
    },
  }),
  new CreateAccessCodeController().create
);

accessCodeRouter.get("/all/", listAccessCode.listAll);

accessCodeRouter.get(
  "/bycode/:code",
  celebrate({
    [Segments.PARAMS]: {
      code: Joi.string().required(),
    },
  }),
  listAccessCode.byCode
);

accessCodeRouter.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      expiredAt: Joi.string().isoDate().required(),
    },
  }),
  new UpdateAccessCodeController().execute
);

accessCodeRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  new DeleteAccessCodeController().delete
);

export { accessCodeRouter };
