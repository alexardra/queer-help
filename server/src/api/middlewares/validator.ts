import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@/errors';
import { UserRole, UserVerificationStatus } from '@/interfaces/personas';
import { AssistanceCategory } from '@/interfaces/assistance';

export enum Resource {
  LOGIN = 'login',
  REGISTER_USER = 'registerUser',
  REGISTER_ADMIN = 'registerAdmin',
  ASSISTANCE = 'assistance',
}

const schemas = {
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  registerUser: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    referenceLinks: Joi.array().min(1).items(Joi.string()).required(),
    personalNumber: Joi.number().required(),
    verificationStatus: Joi.string().valid(
      UserVerificationStatus.Pending,
      UserVerificationStatus.Verified,
      UserVerificationStatus.Failed,
    ),
    role: Joi.number()
      .valid(UserRole.Beneficiary, UserRole.Volunteer, UserRole.Both)
      .required(),
    phoneNumber: Joi.string()
      .min(9)
      .max(20)
      .when('role', {
        is: Joi.any().valid(UserRole.Volunteer, UserRole.Both),
        then: Joi.required(),
        otherwise: Joi.any(),
      }),
    description: Joi.string().when('role', {
      is: Joi.any().valid(UserRole.Volunteer, UserRole.Both),
      then: Joi.required(),
      otherwise: Joi.any(),
    }),
  }),
  registerAdmin: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
  }),
  assistance: Joi.object().keys({
    category: Joi.any()
      .valid(
        AssistanceCategory.DOCTOR_CONSULTATION,
        AssistanceCategory.LEGAL_CONSULTATION,
        AssistanceCategory.FINANCIAL_ADVISE,
        AssistanceCategory.TECHNICAL_SUPPORT,
        AssistanceCategory.EDUCATIONAL_ADVISE,
        AssistanceCategory.HELP_WITH_SPECIFIC_ITEM,
      )
      .required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
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
