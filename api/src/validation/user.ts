import Joi from "joi";
import { UserRegister } from "../model/user";

export const userRegisterSchema = Joi.object<UserRegister>({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
}).options({ abortEarly: false });

