import { axios } from '@/lib/axios';
import { AxiosResponse } from 'axios';

export type Assistance = {
  id: string;
  category: AssistanceCategory;
  status: string;
  title: string;
  description: string;
};

export enum AssistanceCategory {
  DOCTOR_CONSULTATION = 1,
  LEGAL_CONSULTATION = 2,
  FINANCIAL_ADVISE = 3,
  TECHNICAL_SUPPORT = 4,
  EDUCATIONAL_ADVISE = 5,
  HELP_WITH_SPECIFIC_ITEM = 6,
}

export const AsistanceCategoryMap = {
  [AssistanceCategory.DOCTOR_CONSULTATION]: 'Doctor consultation',
  [AssistanceCategory.LEGAL_CONSULTATION]: 'Legal consultation',
  [AssistanceCategory.FINANCIAL_ADVISE]: 'Financial advise',
  [AssistanceCategory.TECHNICAL_SUPPORT]: 'Technical support',
  [AssistanceCategory.EDUCATIONAL_ADVISE]: 'Educational advise',
  [AssistanceCategory.HELP_WITH_SPECIFIC_ITEM]: 'Help with specific item',
};

export type FetchAssistancesResponse = {
  assistances: Assistance[];
  count: number;
};

export const fetchAssistances = (): Promise<FetchAssistancesResponse> => {
  return axios
    .get('/assistances')
    .then(
      (response: AxiosResponse) => response.data as FetchAssistancesResponse,
    );
};

export const createAssistance = (assistance: {
  category: AssistanceCategory;
  title: string;
  description: string;
}) => {
  return axios.post('/assistances', assistance);
};

export const fetchAssistance = (id: string): Promise<Assistance> => {
  return axios.get(`/assistances/${id}`).then((response: AxiosResponse) => {
    const { assistance } = response.data as { assistance: Assistance };
    return assistance;
  });
};
