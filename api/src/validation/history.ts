import { History } from "@prisma/client";
import Joi from "joi";

export const historySchema = Joi.object<History>({
  calc: Joi.string().required(),
  result: Joi.number().required(),
}).options({ abortEarly: false });
