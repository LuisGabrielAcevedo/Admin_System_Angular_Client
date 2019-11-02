import {
  Occupation,
  Role,
  Profession,
  EducationLevel,
  EnterpriseType,
  EconomicSector
} from '@app/proposal/api/patch.proposal.req';
import { AfipActivity } from '@app/proposal/api/proposal';
export interface ProfessionalDataForm {
  occupation: Occupation;
  role: Role;
  profession: Profession;
  educationLevel: EducationLevel;
  enterpriseType: EnterpriseType;
  economicSector: EconomicSector;
  afipActivity: AfipActivity;
  afipMonth: string;
  afipYear: string;
}

export const ProfessionalDataFormFactory = (
  param: any = {}
): ProfessionalDataForm => {
  const newProfessionalDataForm: ProfessionalDataForm = {
    occupation: {
      id: null,
      description: null,
      integrationCode: null
    },
    role: {
      id: null,
      description: null
    },
    profession: {
      id: null,
      description: null,
      educationLevels: null
    },
    educationLevel: {
      id: null,
      description: null
    },
    enterpriseType: {
      id: null,
      description: null
    },
    economicSector: {
      id: null,
      description: null
    },
    afipActivity: {
      id: null,
      description: null,
      afipCode: null
    },
    afipMonth: null,
    afipYear: null
  };
  const result = {
    ...newProfessionalDataForm,
    ...param
  } as ProfessionalDataForm;

  return result;
};
