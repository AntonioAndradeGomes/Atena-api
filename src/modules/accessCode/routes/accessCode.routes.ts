import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateAccessCodeController } from "../controllers/CreateAccessCodeController";
import { ListAccessCodeController } from "../controllers/ListAccessCodeController";

const accessCodeRouter = Router();
const listAccessCode = new ListAccessCodeController();

accessCodeRouter.post('/', celebrate({
    [Segments.BODY] : {
      expiredAt : Joi.string().isoDate().required(),
    }
}), new CreateAccessCodeController().create);

accessCodeRouter.get('/all/', listAccessCode.listAll);

accessCodeRouter.get('/bycode/:code', listAccessCode.byCode);

export {accessCodeRouter}
