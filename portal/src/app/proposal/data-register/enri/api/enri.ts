export interface EnriRequest {
  version: string;
  answers: number[];
  occupation: Occupation;
}

export interface Occupation {
  id: number;
  description: string;
  integrationCode: string;
}

export interface EnriResponse {
  approved: boolean;
}

export interface EnriPayload {
  status: string;
  answers: number[];
}
