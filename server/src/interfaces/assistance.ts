import mongoose from 'mongoose';

export enum AssistanceStatus {
  ACTIVE = 1,
  DONE = 2,
  CANCELED = 3,
}
export type AssistanceStatusType =
  | AssistanceStatus.ACTIVE
  | AssistanceStatus.DONE
  | AssistanceStatus.CANCELED;

export enum AssistanceCategory {
  DOCTOR_CONSULTATION = 1,
  LEGAL_CONSULTATION = 2,
  FINANCIAL_ADVISE = 3,
  TECHNICAL_SUPPORT = 4,
  EDUCATIONAL_ADVISE = 5,
  HELP_WITH_SPECIFIC_ITEM = 6,
}
export type AssistanceCategoryType =
  | AssistanceCategory.DOCTOR_CONSULTATION
  | AssistanceCategory.LEGAL_CONSULTATION
  | AssistanceCategory.FINANCIAL_ADVISE
  | AssistanceCategory.TECHNICAL_SUPPORT
  | AssistanceCategory.EDUCATIONAL_ADVISE
  | AssistanceCategory.HELP_WITH_SPECIFIC_ITEM;

export interface IAssistance {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  category: AssistanceCategoryType;
  status: AssistanceStatusType;
  title: string;
  description: string;
}

export interface IAssistanceDto {
  id: string;
  category: AssistanceCategoryType;
  status: AssistanceStatusType;
  title: string;
  description: string;
  createdByPersona: boolean;
}
