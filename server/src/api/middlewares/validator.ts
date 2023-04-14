import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../errors';
import { UserVerificationStatus } from '../../interfaces/user';

export enum Resource {
  LOGIN = 'login',
  REGISTER = 'register',
}

const schemas = {
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  register: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    referenceLinks: Joi.array().min(1).items(Joi.string()).required(),
    personalNumber: Joi.number().required(),
    verificationStatus: Joi.string().valid(
      ...Object.values(UserVerificationStatus),
    ),
  }),
};

export const validator = (property: Resource) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schemas[property].validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      throw new BadRequestError(message);
    }
  };
};
